require('dotenv').config()


const express = require('express')
const { registerUser, retrieveUser, authenticateUser, updateUserImage, updateUserName, updateUserEmail, updateUserPassword } = require('./logic/users')
const { createPost } = require('./logic/posts')
const { extractUserId } = require('./helpers')
const { jsonBodyParser } = require('./utils')
const { cors } = require('./utils')

const api = express()

api.use(cors)

api.post('/', (req, res) => res.send('Hello, API!'))
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

api.get('/users', (req, res) => {
    try {
        const userId = extractUserId(req)

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

api.patch('/users/image', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { image } = req.body

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
api.patch('/users/username', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { name } = req.body

        updateUserName(userId, name, error => {
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
api.patch('/users/email', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { email } = req.body

        updateUserEmail(userId, email, error => {
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
api.patch('/users/password', jsonBodyParser, (req, res) => {
    try {
        const userId = extractUserId(req)

        const { password, newPassword, repeatPassword } = req.body

        updateUserPassword(userId, password, newPassword, repeatPassword, error => {
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

api.post('/posts', jsonBodyParser, (req, res) => {

    try {
        const userId = extractUserId(req)

        const { id, author, image, title, text, date, comments, likes, visibility, location } = req.body

        createPost(userId, image, title, text, location, error => {
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


api.listen(`${process.env.PORT}`, () => console.log(`server running in port ${process.env.PORT}`))