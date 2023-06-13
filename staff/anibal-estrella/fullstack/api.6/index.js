require('dotenv').config()

const express = require('express')

const { registerUser, retrieveUser, authenticateUser, updateUserPassword, updateUserAvatar, createPost } = require('./logic')
const { extractUserId } = require('./helpers')
const { cors, jsonBodyParser } = require('./utils')

const api = express()
// cross origin resource sharing utility
api.use(cors)



api.get('/', (req, res) => res.send('Hello, API!'))

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, email, password } = req.body

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


api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { email, password } = req.body

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



api.get('/users', (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.patch('/users/:userId', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { avatar } = req.body

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

api.patch('/users/password/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, password, previousPassword, newPassword, newPasswordConfirm } = JSON.parse(json)

            updateUserPassword(userId, password, previousPassword, newPassword, newPasswordConfirm, error => {
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


api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image, text } = req.body

        createPost(userId, image, text, error => {
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


api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))