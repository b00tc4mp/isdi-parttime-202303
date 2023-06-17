module.exports = (req, res, next) => {
    // muy importante: antes de parsear, compruebo que se ha puesto bien la cabecera

    const { 'content-type': contenType } = req.headers

    if (contenType !== 'application/json') {
        res.status(404).json({ message: 'no application/json header founded' })

        return
    }


    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        //nos aseguramos de que el body no viene vacío
        try {
            req.body = JSON.parse(json)
            next()
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

    })

}