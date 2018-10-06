"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const phantomGlobalOptions = { strategy: 'dedicated-process' };
const conversion = require("phantom-html-to-pdf")(phantomGlobalOptions);
function createConverter(options) {
    const converter = conversion;
    return converter(options, (err, pdf) => {
        if (err) {
            return;
        }
        const output = fs_1.default.createWriteStream(`${__dirname}/test.pdf`);
        console.log(pdf.logs);
        console.log(pdf.numberOfPages);
        pdf.stream.pipe(output);
    });
}
exports.createConverter = createConverter;
//# sourceMappingURL=convert.js.map