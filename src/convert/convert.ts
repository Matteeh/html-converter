import fs from 'fs';
import { PhantomGlobalOptions, PhantomLocalOptions } from '../../models/index';

const phantomGlobalOptions: PhantomGlobalOptions = { strategy: 'dedicated-process' }
const conversion = require("phantom-html-to-pdf")(phantomGlobalOptions);

export function createConverter(options: PhantomLocalOptions) {
    const converter = conversion;
    return converter(options, (err, pdf) => {
        if (err) {
            return;
        }
        const output = fs.createWriteStream(`${__dirname}/test.pdf`);
        console.log(pdf.logs);
        console.log(pdf.numberOfPages);
        pdf.stream.pipe(output);
    });
    
}
