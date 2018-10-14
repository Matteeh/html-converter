import { from, Observable } from "rxjs";
import { mapTo, retryWhen, map } from "rxjs/operators";
import { firestoreRetryStrategy } from "./helpers";

const Firestore = require('@google-cloud/firestore');

const projectId =  process.env.GOOGLE_PROJECT_ID;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// Create a client
const db = new Firestore({
    projectId,
    keyFilename
  });

/**
 * Get refrence to specified firestore collection
 * if collection missing it will be created on the fly 
 * @param document Firestore Document
 */
export function getCollectionRef(collection: string) {
    return db.collection(collection);
}

export function findDoc(doc): Observable<boolean> {
    return from(doc.get()).pipe(
        map(({exists = null}) => exists),
    );
}

/**
 * Push data to specified Document
 * @param doc Document to modify
 * @param data any data
 */
export function add(doc, data): Observable<boolean> {
    return from(doc.set(data)).pipe(
        mapTo(true),
        retryWhen(firestoreRetryStrategy()),
    )
}

/**
 * Update existing data in specified Document
 * @param doc Document to modify
 * @param data any data
 */
export function update(doc, data): Observable<boolean> {
    return from(doc.update(data)).pipe(
        mapTo(true),
        retryWhen(firestoreRetryStrategy()),
    )
}

/**
 * Retrieve specified data from specified Document
 * @param doc Document
 * @param data any data
 */
export function get(doc, data): Observable<any> {
    return from(doc.get(data)).pipe(
        retryWhen(firestoreRetryStrategy()),
    )
}

/**
 * Delete specified data from specified Document
 * @param doc Document to modify
 * @param data any data
 */
export function del(doc): Observable<boolean> {
    return from(doc.delete()).pipe(
        mapTo(true),
        retryWhen(firestoreRetryStrategy()),
    )
}
