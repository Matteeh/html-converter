import { app } from "./app";

/**
 * Error handling here
 */


/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    console.log(
        `App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`
    );
});
  
export { server };
  