const express = require('express')
const { registerUser, retrieveUser, authenticateUser, updateUserImage, updateUserName, updateUserEmail, updateUserPassword } = require('./logic/users')

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

api.patch('/users/image/:userId', (req, res) => {
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
api.patch('/users/username/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        debugger
        try {
            const { userId } = req.params
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
api.patch('/users/email/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { userId } = req.params
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
api.patch('/users/password/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {

        try {
            const { userId } = req.params
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

api.listen(4000)