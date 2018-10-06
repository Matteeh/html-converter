"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const converter = __importStar(require("./convert"));
exports.router = express_1.default.Router();
converter.createConverter({ html: "<h1>Hello World</h1>" });
/**
 * POST /convert
 */
exports.router.post('/', (req, res, next) => {
    console.log('Do something');
});
//# sourceMappingURL=routes.js.map