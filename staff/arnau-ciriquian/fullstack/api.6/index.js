const express = require('express')
const { registerUser, authenticateUser, getLoggedUser } = require('./logic')

const api = express()

api.get('/', (req, res) => res.send('Hello, World!'))

api.get('/helloworld', (req, res) => res.json({hello: 'world'}))

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
        } catch(error) {
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
        } catch(error) {
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

            res.json({ user })
        })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})


api.listen(4000)