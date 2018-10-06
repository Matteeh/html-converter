"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const convert_1 = require("./convert");
// Create Express server
const app = express_1.default();
exports.app = app;
const API = process.env.API_URL;
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * Primary app api routes
 */
app.use(API + '/convert', convert_1.router);
/**
 * Health check
 */
app.get('/', (req, res) => {
    res.send('App ready.');
});
//# sourceMappingURL=app.js.map