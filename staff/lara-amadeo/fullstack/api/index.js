const express = require('express')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')

const api = express()

api.get('/', (req, res) => res.send(`Hello, I'm a working api!`))

api.get('/whoami', (req, res) => res.json({ name: 'lara', age: '24', hobby: 'ceramic' }))

api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        const user = JSON.parse(json)
        console.log(user)

        try {
            registerUser(user.username, user.email, user.password, error => {
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
        const user = JSON.parse(json)
        console.log(user)

        try {
            authenticateUser(user.email, user.password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(200).send()
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.get('/users/userId', (req, res) => {

    console.log(req.params['userId'])

    // const preId = req.params
    const id = req.params['userId']
    try {
        retrieveUser(id, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).send()
            console.log(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

api.listen(4000)