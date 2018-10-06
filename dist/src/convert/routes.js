"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const convert_1 = require("./convert");
exports.router = express_1.default.Router();
/**
 * POST /convert
 */
exports.router.post('/', (req, res, next) => {
    console.log('i run');
    convert_1.convert({ url: 'https://github.com/pofider/phantom-html-to-pdf' })
        .then(pdfStream => pdfStream.pipe(res))
        .catch(err => console.error(err));
});
//# sourceMappingURL=routes.js.map