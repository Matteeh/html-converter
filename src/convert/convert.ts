import { PhantomGlobalOptions, PhantomLocalOptions, PhantomConverter } from '../../models/index';
import { Readable } from 'stream';

const conversion = require("phantom-html-to-pdf");


const converter: PhantomConverter = _createConverter();
console.log(converter);

/**
 * Convert a requested job
 * @param options a conversion job
 */
export function convert(options: PhantomLocalOptions): Promise<Readable> {
    return new Promise((resolve, reject) => {
        converter(options, (err, pdf) => {
            if(err) {
                reject(err);
            }
            resolve(pdf.stream);
        });
    });
}

/**
 * @private
 * Create a phantom converter, only one instance is supported
 * @param phantomOptions Set converter options
 */
function _createConverter(phantomOptions?: PhantomGlobalOptions) {
    const options = phantomOptions || { strategy: 'dedicated-process' };
    return conversion(options);    
}
