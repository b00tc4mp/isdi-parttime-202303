//en https los sockets van encriptados
//las peticiones al navegador siempre son GET
//cuando enviamos formularios son POST
const express = require('express')
//we call the logic to send the data
const { registerUser } = require('./logic')


const api = express()
//api.get we receibe messages from tyhe browser
//(req, res) req = the petition as an object from the browser, res = is an object you send to the browser as a response
api.get('/', (req, res) => {
    debugger
    res.send('Hello, World!')
})

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

// controlers or middlewares
api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)
    // the req.on callback executes as soon all the chinks are received
    req.on('end', () => {
        debugger
        const { name, email, password } = JSON.parse(json)

        try {

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

})

api.get('/users/:userId', (req, res) => {

})

//now we open a port
api.listen(4000)
