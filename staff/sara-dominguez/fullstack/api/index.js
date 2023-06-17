require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar } = require('./logic/')

const api = express()

//le decimos al servidor que acepte cualquier puerto de cualquier navegador--cabecera
api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

//definimos la api
api.get('/', (req, res) => {
    res.send('Hello World!')
})


api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

//REGISTRO USUARIO
//desde Imsomnia lanzamos datos de registro de un usuario
api.post('/users', (req, res) => {
    let json = ''

    //recibimos cada trocito, el chunk y lo añadimos al json
    req.on('data', chunk => {
        json += chunk
    })


    req.on('end', () => {
        try {
            const { name, email, password } = JSON.parse(json)
            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(201).send() //el 201 no devuelve datos, solo indica q el proceso ha sido ok
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

    //AUTHENTICATE USER

    api.post('/users/auth', (req, res) => {
        let json = ''

        req.on('data', chunk => json += chunk)

        req.on('end', () => {
            try {
                const { email, password } = JSON.parse(json)

                authenticateUser(email, password, (error, userId) => {
                    if (error) {
                        res.status(400).json({ error: error.message })

                        return
                    }

                    res.status(200).json({ userId })
                })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })
    })

    //RETRIEVE USER
    // podemos ponerle la ruta con el parametro con :userId
    api.get('/users/:userId', (req, res) => {
        try {
            // const userId = req.params.userId
            const { userId } = req.params

            retrieveUser(userId, (error, user) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                // res.status(200).json(user)
                res.json(user)
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })

    //UPDATE USER AVATAR

    api.patch('/users/:userId', (req, res,) => {
        let json = ''

        req.on('data', chunk => json += chunk)

        req.on('end', () => {

            try {
                const { userId } = req.params //recupero usuario
                const { avatar } = JSON.parse(json)

                updateUserAvatar(userId, avatar, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })

                        return
                    }

                    res.status(204).send()
                })

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })
    })
})

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
