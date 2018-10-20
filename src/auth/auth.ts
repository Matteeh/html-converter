import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import unique from 'uniqid';
import { generateRandomStr } from './helper';
import { Observable, throwError, of, from, combineLatest } from 'rxjs';
import { CustomError } from '../error';
import { findClient, addClient } from '../client';
import { concatMap, map } from 'rxjs/operators';
import { ClientRequest } from '../types/authentication';


/**
 * Setup a new client
 * @param obj grantType, clientId, clientSecret
 */
export function newClient({ grantType = null, id = null, secret = null }: ClientRequest): Observable<any> {
    if(!grantType || !id || !secret) {
        const missingProp = grantType ? id ? 'clientSecret' : 'clientId' : 'grantType';
        return throwError(new CustomError(400, `ReferenceError: ${missingProp} is not defined`));
    }
    if(!grantTypeValidator) {
        return throwError(new CustomError(400, 'grant_type must contain a value of: client_credentials'));
    }
    return findClient(id).pipe(
        concatMap(exists => exists ? 
            throwError(new CustomError(422, `${id} already exists`)) :
            hashSecret(secret)
        ),
        concatMap(hashedSecret => addClient(id, { secret: hashedSecret })),
        map(success => success ? createXtoken(id) : false)
    );
}

/**
 * Create an accesstoken
 * @param clientId 
 * @param clientSecret 
 */
export function createXtoken(clientId): string {
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
    return from(bcrypt.hash(secret, parseInt(saltRounds, 10)));
}

export function grantTypeValidator(str) {
    // As defined in the OAuth 2.0 specification,
    // this field must contain a value of client_credentials
    return str.trim() === 'client_credentials' ;
}