require('dotenv').config()

const { registerUser, authenticateUser, retrieveUser, updateUserAvatar } = require('./logic')

const express = require('express')
const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.get('/', (req, res) => {
    //debugger
    res.send('Hello, World!')
})

api.post('/user', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        const { name, email, password } = JSON.parse(json)

        try {
            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(201).send()
            })
        }
        catch {
            res.status(400).json({ error: error.message})
        }
    })

})

api.post('/users/auth', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        const { email, password } = JSON.parse(json)

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }
                res.status(201).json({userId: userId})
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params

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

api.patch('/users/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { avatar, password, newPassword, newPasswordConfirm } = JSON.parse(json)

            if(avatar) {
                updateUserAvatar(userId, avatar, error => {
                    if (error) {
                        res.status(400).json({ error: error.message })

                        return
                    }

                    res.status(204).send()
                })
            }
            if (password) {
                updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
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