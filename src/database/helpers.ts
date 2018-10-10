import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

interface RetryStrategyOptions {
    maxRetryAttempts?: number,
    scalingDuration?: number,
    excludedStatusCodes?: Array<number>
}

export const firestoreRetryStrategy = ( 
    {
        maxRetryAttempts = 3,
        scalingDuration = 300,
        excludedStatusCodes = []
    }: RetryStrategyOptions = {}) => (attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((err, i) => {
                const retryAttempt = i + 1;
                // if maximum number of retries have been met
                // or response is a status code we don't wish to retry, throw error
                if (retryAttempt > maxRetryAttempts ||
                    excludedStatusCodes.find(e => e === err.status)) {
                    return throwError(err);
                }
                console.log(
                    `Attempt ${retryAttempt}: retrying in ${retryAttempt *
                    scalingDuration}ms`
                );
                // retry after 300ms, 600ms, 900ms
                return timer(retryAttempt * scalingDuration);
            }),
            finalize(() => console.log('Done!'))
        );
}