
module.exports = function jsonBodyParser(req, res, next){
    const { 'content-type': contentType } = req.headers

    if(contentType !== 'application/json'){
        res.status(400).json(new Error('content-type header not written'))

        return
    }

    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try{
            req.body = JSON.parse(json)

            next()
        } catch(error){
            res.status(400).json(new Error( { error: error.message } ))
        }
    })
}