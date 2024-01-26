const { errors: {
    DuplicityError,
    ExistenceError,
    AuthError,
    ContentError,
    PropertyError,
} } = require('com')

module.exports = function handleErrors(callback) {
    return (req, res) => {
        try {
            const promise = callback(req, res)

                ; (async () => {
                    try {
                        await promise
                    } catch (error) {
                        let status = 500

                        if (error instanceof DuplicityError || error instanceof PropertyError) {
                            status = 409
                        }
                        else if (error instanceof ExistenceError) {
                            status = 404
                        }
                        else if (error instanceof AuthError) {
                            status = 401
                        }

                        res.status(status).json({ message: error.message, type: error.constructor.name })
                    }
                })()
        } catch (error) {
            let status = 500

            if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError)
                status = 406

            res.status(status).json({ message: error.message, type: error.constructor.name })
        }
    }
}