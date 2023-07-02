const { errors: {
    DuplicityError,
    ExistenceError,
    AuthError,
    ContentError,
} } = require('com')

module.exports = function handleErrors(callback) {
    return function (req, res) {
        try {
            callback(req, res)
                .catch(error => {
                    let status = 500

                    if (error instanceof DuplicityError) {
                        status = 409
                    }
                    else if (error instanceof ExistenceError) {
                        status = 404
                    }
                    else if (error instanceof AuthError) {
                        status = 401
                    }

                    res.status(status).json({ error: error.message })
                })
        } catch (error) {
            let status = 500

            if (error instanceof ContentError || error instanceof TypeError || error instanceof RangeError)
                status = 406

            res.status(status).json({ error: error.message })
        }
    }
}