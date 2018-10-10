import { from, of, Observable } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';

const Storage = require('@google-cloud/storage');

const projectId =  process.env.GOOGLE_PROJECT_ID;
const bucketName = process.env.GOOGLE_HTML_TEMP_BUCKET;

// Creates a refrence to the bucket
const bucket = new Storage({ projectId }).bucket(bucketName);

/**
 * Make the bucket and its contents private
 */
bucket.makePrivate({ includeFiles: true }, (err) => {});

/**
 * Upload a file to the bucket
 * @param file 
 */
export function upload(file): Observable<boolean> {
    return from(bucket.upload(file, {
        gzip:true,
        metadata: { 
            cacheControl:'public, max-age=31536000'
        }
    })).pipe(
        mapTo(true),
        catchError(err => of(err))
    );
}

/**
 * Delet a file from the bucket
 * @param file 
 */
export function del(file): Observable<boolean> {
    return from(bucket
        .file(file)
        .delete(file))
    .pipe(
        mapTo(true),
        catchError(err => of(err))
    );
}