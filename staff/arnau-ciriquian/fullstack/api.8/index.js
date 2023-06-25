require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, getLoggedUser, updateUserAvatar, updateUserEmail, updateUsername, updateUserPassword } = require('./logic')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.get('/', (req, res) => res.send('Hello, World!'))

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

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

api.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params

        getLoggedUser(userId, (error, user) => {
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

api.patch('/users/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {

        try {
            const { userId } = req.params
            const { username, newUsername, avatar, email, newEmail, newEmailConfirmation, password, newPassword, newPasswordConfirmation } = JSON.parse(json)

            if (avatar) {
                updateUserAvatar(userId, avatar, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })

                        return
                    }

                    res.status(204).send()
                })
            }

            if (newEmail) {
                updateUserEmail(userId, email, newEmail, newEmailConfirmation, password, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })
    
                        return
                    }
    
                    res.status(204).send()
                })
            }
            
            if (newUsername) {
                updateUsername(userId, username, newUsername, password, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })
    
                        return
                    }
    
                    res.status(204).send()
                })
            }

            if (newPassword) {
                updateUserPassword(userId, password, newPassword, newPasswordConfirmation, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })
    
                        return
                    }
    
                    res.status(204).send()
                })
            }

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))