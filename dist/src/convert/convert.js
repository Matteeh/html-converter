"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversion = require("phantom-html-to-pdf");
const converter = _createConverter();
console.log(converter);
/**
 * Convert a requested job
 * @param options a conversion job
 */
function convert(options) {
    return new Promise((resolve, reject) => {
        converter(options, (err, pdf) => {
            if (err) {
                reject(err);
            }
            resolve(pdf.stream);
        });
    });
}
exports.convert = convert;
/**
 * @private
 * Create a phantom converter, only one instance is supported
 * @param phantomOptions Set converter options
 */
function _createConverter(phantomOptions) {
    const options = phantomOptions || { strategy: 'dedicated-process' };
    return conversion(options);
}
//# sourceMappingURL=convert.js.map