require('dotenv').config()

const express = require('express')

const { registerUser, retrieveUser, authenticateUser, updateUserPassword, updateUserAvatar, createPost } = require('./logic')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

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

    req.on('data', chunk => json += chunk)

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


api.get('/users', (req, res) => {
    try {
        //every time we call the API to perform an action wioth a USER we send the user through the AUTHORIZATION header
        const { authorization } = req.headers
        // "Bearer  user-id"
        const userId = authorization.slice(7)


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
            // get user ID using headers
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { avatar } = JSON.parse(json)

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

// when working wioth users that will create things instead of using routes we'll use a specific headaer authorization 
api.post('/posts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { authorization } = req.headers
            const userId = authorization.slice(7)

            const { image, text } = JSON.parse(json)

            createPost(userId, image, text, error => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }
                // post error: 201 error
                res.status(201).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })

        }
    })
})


api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))