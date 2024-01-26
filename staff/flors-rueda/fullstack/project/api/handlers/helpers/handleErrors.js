const { errors: {
    DuplicityError,
    ContentError,
    FormatError,
    AuthError,
    ExistenceError,
} } = require('com');

/**
 * Error handling middleware for route callbacks.
 *
 * This middleware function wraps a given route callback to handle errors that might occur
 * during its execution. It catches and handles various types of errors, maps them to appropriate
 * HTTP status codes and error messages, and sends the appropriate response.
 *
 * @param {Function} callback The route callback function to be wrapped by the middleware.
 * @returns {Function} A middleware function that wraps the provided route callback.
 */
module.exports = (callback) => {
    return (req, res) => {
        try {
            const promise = callback(req, res);
            (async () => {
                try {
                    await promise
                } catch (error) {
                    let status = 500;

                    if (error instanceof DuplicityError) status = 409;
                    else if (error instanceof ExistenceError) status = 404;
                    else if (error instanceof AuthError) status = 401;

                    console.log(error);
                    res.status(status).json({ message: error.message, type: error.constructor.name });
                }
            })()
        } catch (error) {
            let status = 500;

            if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError || error instanceof FormatError) {
                status = 406;
            }

            console.log(error);
            res.status(status).json({ message: error.message, type: error.constructor.name });
        }
    }
}