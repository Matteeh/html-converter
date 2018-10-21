import *  as puppeteer from 'puppeteer';
import { from, Observable, throwError } from 'rxjs';
import { map, switchMap, concatMap } from 'rxjs/operators';
import { PdfConversion } from 'conversion';

const browser = launchBrowser();

export function newConversion(guid, { input: { html, url } }: PdfConversion) {
    if (!html && !url) {
        const missingProp = html ? 'html' : 'url';
        return throwError(`ReferenceError: ${missingProp} is not defined`);
    }
    if (!url) {
        Object.keys(html).forEach(key => {
            // Need client id for file routes in bucket
        });
        // upload to cloud storage and get link
    }
    // save link in firestore
}

/**
 * browser.pipe(
        concatMap(browser => canConvert(browser)),
        concatMap(canConvert => canConvert ? convert(canConvert, job) : queueJob(job))
    )
 */

export function convert(page: puppeteer.Page, job): Observable<any> {
    return from(null);
}

/**
 * Queue conversion job if browser already has 4 open tabs
 * If convert return a new page
 * @param browser
 */
function canConvert(browser: puppeteer.Browser): Observable<any> {
    return from(browser.pages()).pipe(
        switchMap((pages: Array<puppeteer.Page>) => pages.length >= 4 ? newPage(browser) : from(null))
    );
}

function queueJob(job): Observable<any> {
    return from(null);
}


/**
 * Open a new page/tab in the browser
 * @param browser
 */
function newPage(browser: puppeteer.Browser): Observable<puppeteer.Page> {
    return from(browser.newPage());
}

/**
 * @private
 * Launch a headless Chromium instance
 */
function launchBrowser(): Observable<puppeteer.Browser> {
    // Arguments to pass to the Chromium instance
    const args = ['--no-sandbox', '--disable-setuid-sandbox'];
    try {
        // Create and return a browser instance
        return from(puppeteer.launch({ args }));
    } catch (err) {
        return err;
    }
   
}