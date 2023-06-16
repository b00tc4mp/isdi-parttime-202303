const express = require('express')
const { registerUser } = require('./logic')

const api = express()

// api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))


api.post('/users', (req, res) => {
    debugger

    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

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


api.listen(4000)