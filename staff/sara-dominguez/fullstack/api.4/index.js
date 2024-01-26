require('dotenv').config()
const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, createPost } = require('./logic')
const { extractUserId } = require('./helpers')
const { cors, jsonBodyParser } = require('./utils')

const api = express()

//le decimos al servidor que acepte cualquier puerto de cualquier navegador--cabecera
api.use(cors)

//definimos la api
api.get('/', (req, res) => {
    res.send('Hello, API!')
})


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
})

//AUTHENTICATE USER

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { email, password } = req.body

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




//RETRIEVE USER
// podemos ponerle la ruta con el parametro con :userId
api.get('/users', (req, res) => {
    try {
        const userId = extractUserId(req)

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

api.patch('/users', jsonBodyParser, (req, res,) => {
    try {
        const userId = extractUserId(req)
        const { avatar } = req.body

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



//CREATE POST

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image, text } = req.body

        createPost(userId, image, text, error => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(201).send() // el 201 es cuando creamos algo
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
