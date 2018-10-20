import * as db from '../database';
import { Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

const clientsRef = db.getCollectionRef('clients');

/**
 * Add a new client
 * @param clientId 
 * @param data 
 */
export function addClient(clientId, data): Observable<boolean> {
    const newClientDoc = clientsRef.doc(clientId);
    return db.add(newClientDoc, data);
}

/**
 * Look for client in clients collection
 * @param clientId 
 */
export function findClient(clientId): Observable<any> {
    return db.findDoc(clientsRef, clientId);
}

/**
 * Delete a client
 * @param clientId 
 */
export function deleteClient(clientId): Observable<boolean> {
    const clientDoc = clientsRef.doc(clientId);
    return db.del(clientDoc);
}