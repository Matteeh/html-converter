import * as db from '../database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const usersRef = db.getCollectionRef('users');

/**
 * Add a new user
 * @param id 
 * @param data 
 */
export function addUser(data): Observable<string> {
    const newUserDoc = usersRef.doc();
    return db.add(newUserDoc, data).pipe(
        map(success => success ? newUserDoc.id : null)
    );
}

/**
 * Look for user in users collection
 * @param id
 * @return a QuerySnapshot
 */
export function findUser(id): Observable<any> {
    return db.findDoc(usersRef, id);
}

/**
 * Delete a user
 * @param id 
 */
export function deleteUser(id): Observable<boolean> {
    const userDoc = usersRef.doc(id);
    return db.del(userDoc);
}