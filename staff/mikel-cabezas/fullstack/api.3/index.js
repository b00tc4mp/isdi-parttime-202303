const express = require('express')
const { registerUser, retrieveUser, authenticateUser } = require('./logic')
const updateUserImage = require('./logic/updateUserImage')

const api = express()

// api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    next()
})
api.post('/users', (req, res) => {
    let json = ''
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
                res.status(201).send()
            })
        } catch (error) {

            res.status(400).json({ error: error.message })
        }
    })
})


api.get('/users/:userId', (req, res) => {
    // TODO call retrieveUser and return user in json
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
api.post('/users/auth', (req, res) => {
    let json = ''
    req.on('data', chunk => {
        json += chunk
    })
    req.on('end', () => {
        try {
            const { email, password } = JSON.parse(json)

            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.json({ userId })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/users/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { userId } = req.params
            const { image } = JSON.parse(json)

            updateUserImage(userId, image, error => {
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

api.listen(4000)