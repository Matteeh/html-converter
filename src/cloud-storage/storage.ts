import { from, of, Observable } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';
import { PassThrough } from 'stream';
import { fromStream } from '../util/rxjs';

const Storage = require('@google-cloud/storage');

const projectId =  process.env.GOOGLE_PROJECT_ID;

// Creates a refrence to 'name' bucket
export function getBucketRef(name) {
    return new Storage({ projectId }).bucket(name);
}

/**
 * Upload a file to specified bucket
 * @param filename bucket.file
 */
export function upload(filename): Observable<boolean> {
    const dataStream = new PassThrough();
    const args = { gzip:true, metadata: { cacheControl:'public, max-age=31536000' } };
    return fromStream(dataStream.pipe(filename.createWriteStream(args)))
    .pipe(
        mapTo(true),
        catchError(err => of(err))
    );
}

/**
 * Delete a file from specified bucket
 * @param filename bucket.file
 */
export function del(filename): Observable<boolean> {
    return from(filename.delete(filename))
    .pipe(
        mapTo(true),
        catchError(err => of(err))
    );
}


