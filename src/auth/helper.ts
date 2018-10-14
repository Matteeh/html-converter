import * as crypto from 'crypto';
import { randomIntFromInterval } from '../util/helpers';

/**
 * Generate random 8-14 byte string
 */
export function generateRandomStr(): string {
    // convert to hexadecimal format
    return crypto.randomBytes(randomIntFromInterval(8, 14)).toString('hex') 
}