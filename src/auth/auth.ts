import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import unique from 'uniqid';
import { generateRandomStr } from './helper';
import { Observable, throwError, of, from, combineLatest } from 'rxjs';
import { CustomError } from '../error';
import { findClient, addClient } from '../client';
import { concatMap, map } from 'rxjs/operators';


/**
 * Setup a new client
 * @param obj grantType, clientId, clientSecret
 */
export function newClient({ grantType = null, clientId = null, clientSecret = null }): Observable<any> {
    if(!grantType || !clientId || !clientSecret) {
        const missingProp = grantType ? clientId ? 'clientSecret' : 'clientId' : 'grantType';
        return throwError(new CustomError(400, `ReferenceError: ${missingProp} is not defined`));
    }
    return findClient(clientId).pipe(
        concatMap(isTaken => isTaken ? 
            throwError(new CustomError(422, `${clientId} is already taken`)) :
            hashSecret(clientSecret)
        ),
        concatMap(hashedSecret  =>  combineLatest(
            addClient(clientId, { secret: hashedSecret }),
            createXtoken(clientId, hashedSecret)) ),
        map(([success, token]) => success ? token : false)
    );
}

/**
 * Create an accesstoken
 * @param clientId 
 * @param clientSecret 
 */
export function createXtoken(clientId, clientSecret) {
    const options: jwt.SignOptions = {
        // HS256, because we have control over who uses the secret keys
        algorithm: 'HS256',
        // We will invalidate tokens when jobs are done instead
        noTimestamp: true
    }
    const secret = process.env.HTML_CONVERTER_SECRET;
    const token = jwt.sign({ clientId }, secret, options);
    return token;
}

/**
 * Hash a string
 * @param secret 
 */
export function hashSecret(secret: string): Observable<string> {
    const saltRounds = process.env.SALT_ROUNDS;
    return from(bcrypt.hash(secret, saltRounds));
}