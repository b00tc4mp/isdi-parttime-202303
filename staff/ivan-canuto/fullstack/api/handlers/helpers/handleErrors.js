const { errors: { ExistenceError, DuplicityError, AuthError, ContentError, InvalidRequestError } } = require('com')


module.exports = (callBack) => {
    return (req, res) => {
        try {
            callBack(req, res)
                .catch(error => {
                    let status = 500
            
                    if(error instanceof DuplicityError)
                        status = 409
                    else if(error instanceof ExistenceError)
                        status = 404
                    else if(error instanceof AuthError)
                        status = 401
                    else if(error instanceof InvalidRequestError || error instanceof ContentError)
                        status = 406
            
                    res.status(status).json({ error: error.message })
                })
        } catch (error) {
            let status = 500
        
            if(error instanceof TypeError || error instanceof ContentError || error instanceof RangeError)
            status = 406
        
            res.status(status).json({ error: error.message })
        }  
    }
}