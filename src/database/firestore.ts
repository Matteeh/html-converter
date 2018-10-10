import { from, Observable, of } from "rxjs";
import { mapTo, retryWhen, catchError } from "rxjs/operators";
import { firestoreRetryStrategy } from "./helpers";

const Firestore = require('@google-cloud/firestore');

const projectId =  process.env.GOOGLE_PROJECT_ID;
const keyFilename = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
// Create a client
const firestore = new Firestore({
    projectId,
    keyFilename
  });

/**
 * Creates a new firestore document
 * @param document Firestore Document
 */
export function createDocument(document: string) {
    return firestore.doc(document);
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
        catchError(err => of(err))
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
        catchError(err => of(err))
    )
}

/**
 * Retrieve specified data from specified Document
 * @param doc Document to modify
 * @param data any data
 */
export function get(doc, data): Observable<any> {
    return from(doc.get(data)).pipe(
        retryWhen(firestoreRetryStrategy()),
        catchError(err => of(err))
    )
}

/**
 * Delete specified data from specified Document
 * @param doc Document to modify
 * @param data any data
 */
export function del(doc, data): Observable<boolean> {
    return from(doc.delete(data)).pipe(
        mapTo(true),
        retryWhen(firestoreRetryStrategy()),
        catchError(err => of(err))
    )
}
