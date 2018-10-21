import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Observable, throwError, from } from 'rxjs';
import { CustomError } from '../error';
import { findUser, addUser } from '../user';
import { concatMap, map } from 'rxjs/operators';
import { ClientRequest } from '../types/authentication';


/**
 * Setup a new user
 * @param obj grantType, clientId, clientSecret
 */
export function newUser({ grantType = null, id = null, secret = null }: ClientRequest): Observable<string | CustomError> {
    if(!grantType || !id || !secret) {
        const missingProp = grantType ? id ? 'clientSecret' : 'clientId' : 'grantType';
        return throwError(new CustomError(400, `ReferenceError: ${missingProp} is not defined`));
    }
    if(!grantTypeValidator) {
        return throwError(new CustomError(400, 'grant_type must contain a value of: client_credentials'));
    }
    return findUser(id).pipe(
        map(({ empty = null }) => empty),
        concatMap(empty => empty ? 
            hashSecret(secret) :
            throwError(new CustomError(422, `${id} already exists`))
        ),
        concatMap(hashedSecret => addUser({ id, secret: hashedSecret })),
        map(guid => guid ? createXtoken(guid) : new CustomError(500))
    );
}

/**
 * Create an accesstoken
 * @param clientId 
 * @param clientSecret 
 */
export function createXtoken(guid): string {
    const options: jwt.SignOptions = {
        // HS256, because we have control over who uses the secret keys
        algorithm: 'HS256',
        noTimestamp: true
    }
    const secret = process.env.HTML_CONVERTER_SECRET;
    const token = jwt.sign({ guid }, secret, options);
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

/**
 * Validate grant type
 * @param str 
 */
export function grantTypeValidator(str): boolean {
    // As defined in the OAuth 2.0 specification,
    // this field must contain a value of client_credentials
    return str.trim() === 'client_credentials' ;
}