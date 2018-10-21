import { app } from './app';
import { errorHandler, logErrors } from './error';


/**
 * Error handling
 */
app.use(logErrors);
app.use(errorHandler);


// Express server configuration
app.set('port', process.env.PORT || 3000);

/**
 * Start Express server
 */
const server = app.listen(app.get('port'), () => {
    console.log(
        `App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`
    );
});
  
export { server };
  