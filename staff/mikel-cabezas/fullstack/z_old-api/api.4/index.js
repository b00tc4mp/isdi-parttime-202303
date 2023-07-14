require('dotenv').config()


const express = require('express')
const { registerUser, retrieveUser, authenticateUser, updateUserImage, updateUserName, updateUserEmail, updateUserPassword } = require('./logic/users')
const { createPost } = require('./logic/posts')

const api = express()

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

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

api.get('/users/', (req, res) => {
    try {
        // const { userId } = req.params
        const { authorization } = req.headers
        const userId = authorization.slice(7)

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

api.patch('/users/image/', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

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
api.patch('/users/username/', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        debugger
        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { name } = JSON.parse(json)

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
})
api.patch('/users/email/', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { email } = JSON.parse(json)

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
})
api.patch('/users/password/', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { password, newPassword, repeatPassword } = JSON.parse(json)

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
})

api.post('/posts', (req, res) => {
    let json = ''
    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { id, author, image, title, text, date, comments, likes, visibility, location } = JSON.parse(json)

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
})

api.listen(`${process.env.PORT}`, () => console.log(`server running in port ${process.env.PORT}`))