const { errors: { ExistenceError, DuplicityError, AuthError, ContentError } } = require('com')


module.exports = (callBack) => {
    return (req, res) => {
        try {
            const promise = callBack(req, res)

            ; (async () => {
                try {
                    await promise
                } catch (error) {
                    let status = 500;
                    let type = 'UnknownError';
                  
                    if (error instanceof DuplicityError) {
                      status = 409;
                      type = error.constructor.name
                    } else if (error instanceof ExistenceError) {
                      status = 404;
                      type = error.constructor.name
                    } else if (error instanceof AuthError) {
                      status = 401;
                      type = error.constructor.name
                    } else if (error instanceof ContentError) {
                      status = 406;
                      type = error.constructor.name
                    }
                  
                    res.status(status).json({ message: error.message, type });
                }
            })()
        } catch (error) {
            let status = 500
            let type = 'UnknownError';
        
            if(error instanceof TypeError || error instanceof ContentError || error instanceof RangeError) {
              status = 406
              type = error.constructor.name
            }
        
            res.status(status).json({ message: error.message, type })
        }  
    }
}