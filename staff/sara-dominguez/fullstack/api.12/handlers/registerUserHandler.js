const { registerUser } = require('../logic')


module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body

        //ahora con promesas
        registerUser(name, email, password)
            .then(() => res.status(200).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }


    // ANTES CON CALLBACKS
    //     registerUser(name, email, password, error => {
    //         if (error) {
    //             res.status(400).json({ error: error.message })

    //             return
    //         }

    //         res.status(201).send() //el 201 no devuelve datos, solo indica q el proceso ha sido ok
    //     })
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }
}
