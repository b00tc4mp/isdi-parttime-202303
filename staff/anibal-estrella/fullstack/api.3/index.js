//en https los sockets van encriptados
//las peticiones al navegador siempre son GET
//cuando enviamos formularios son POST
const express = require('express')
//we call the logic to send the data
const { registerUser, retrieveUser, authenticateUser } = require('./logic')
const updateUserAvatar = require('./logic/updateUserAvatar')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    next()
})

//api.get we receibe messages from tyhe browser
//(req, res) req = the petition as an object from the browser, res = is an object you send to the browser as a response
api.get('/', (req, res) => {
    res.send('Hello, World!')
})

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

// controlers or middlewares
api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)
    // the req.on callback executes as soon all the chinks are received
    req.on('end', () => {

        try {
            const { name, email, password } = JSON.parse(json)

            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }
                res.status(201).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

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
                // is a 200 error by default
                res.json({ userId })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//receives data as a parameter userId params
api.get('/users/:userId', (req, res) => {
    try {
        // const userId = req.params.userId
        // destructured:
        const { userId } = req.params

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }
            // convert the user object to JSON
            res.json(user)
        })
    } catch (error) {
        // catch the synchronous error if so
        res.status(400).json({ error: error.message })
    }
})

api.patch('/users/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)
    // the req.on callback executes as soon all the chinks are received
    req.on('end', () => {
        try {
            const { userId } = req.params
            const { avatar } = JSON.parse(json)

            updateUserAvatar(userId, avatar, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }
            })

            res.status(204).send()

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//now we open a port
api.listen(4000)
