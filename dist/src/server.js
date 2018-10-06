"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
/**
 * Error handling here
 */
/**
 * Start Express server.
 */
const server = app_1.app.listen(app_1.app.get('port'), () => {
    console.log(`App is running at http://localhost:${app_1.app.get('port')} in ${app_1.app.get('env')} mode`);
});
exports.server = server;
//# sourceMappingURL=server.js.map