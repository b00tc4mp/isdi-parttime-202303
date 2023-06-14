const express = require('express')
const { registerUser, retrieveUser } = require('./logic')

const api = express()

// api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))


api.post('/users', (req, res) => {
    let json = ''
    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            debugger
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

    req.on('data', chunk => {
        json += chunk
    })

    // TODO call authenticate user and return userid in json
})
api.get('/users/:userId', (req, res) => {
    // TODO call retrieveUser and return user in json
    debugger
    try {
        const { userId } = req.params

        retrieveUser(userId, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(userId)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})

api.listen(4000)