const { errors: { ExistenceError, DuplicityError, AuthError, ContentError, InvalidRequestError } } = require('com')


module.exports = (callBack) => {
    return (req, res) => {
        try {
            const promise = callBack(req, res)

            ; (async () => {
                try {
                    await promise
                } catch (error) {
                    let status = 500
            
                    if(error instanceof DuplicityError)
                        status = 409
                    else if(error instanceof ExistenceError)
                        status = 404
                    else if(error instanceof AuthError)
                        status = 401
                    else if(error instanceof InvalidRequestError || error instanceof ContentError)
                        status = 406
            
                    res.status(status).json({ message: error.message, type: error.constructor.name })
                }
            })()
        } catch (error) {
            let status = 500
        
            if(error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
            status = 406
        
            res.status(status).json({ message: error.message, type: error.constructor.name })
        }  
    }
}