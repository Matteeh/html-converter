import { Observable } from "rxjs";

/**
   * Converts a flowing stream to an Observable sequence.
   * @param stream A stream to convert to a observable sequence.
   * @param [finishEventName] Event that notifies about closed stream. ("end" by default)
   * @param [dataEventName] Event that notifies about incoming data. ("data" by default)
   * @return An observable sequence which fires on each 'data' event as well as handling 'error' and finish events like `end` or `finish`.
   */
export function fromStream (stream, finishEventName?, dataEventName?): Observable<any> {
    stream.pause();

    finishEventName || (finishEventName = 'end');
    dataEventName || (dataEventName = 'data');

    return Observable.create((observer) => {
      function dataHandler (data) {
        observer.onNext(data);
      }

      function errorHandler (err) {
        observer.onError(err);
      }

      function endHandler () {
        observer.onCompleted();
      }

      stream.addListener(dataEventName, dataHandler);
      stream.addListener('error', errorHandler);
      stream.addListener(finishEventName, endHandler);

      stream.resume();

      return function () {
        stream.removeListener(dataEventName, dataHandler);
        stream.removeListener('error', errorHandler);
        stream.removeListener(finishEventName, endHandler);
      };
    }).publish().refCount();
}