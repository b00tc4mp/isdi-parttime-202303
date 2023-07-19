const { errors: {
    DuplicityError,
    ContentError,
    FormatError,
    AuthError,
    ExistenceError,
} } = require('com');

module.exports = callback => {
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

                    res.status(status).json({ message: error.message, type: error.constructor.name });
                }
            })()
        } catch (error) {
            let status = 500;

            if (error instanceof TypeError || error instanceof ContentError || error instanceof RangeError || error instanceof FormatError) {
                status = 406;
            }

            res.status(status).json({ message: error.message, type: error.constructor.name });
        }
    }
}