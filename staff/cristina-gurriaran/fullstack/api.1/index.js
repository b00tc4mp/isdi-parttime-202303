require('dotenv').config()
const express = require('express')
const { registerUser , authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword, retrievePosts, createPost, deletePost, updatePost, retrievePost} = require('./logic')

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
    try{
        const { authorization } = req.headers
        const userId = authorization.slice(7)
        
        retrieveUser(userId, (error, user) => {
            if(error){
                res.status(400).json({ error: error.message })
                return
            }
            res.json(user)
        })

    } catch {
        res.status(400).json({ error: error.message })
    }
})

api.patch('/users/avatar/:userId', (req, res) => {
    let json = ''
    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try{
            const { userId } = req.params
            const { avatar } = JSON.parse(json)

            updateUserAvatar( userId, avatar, error => {
                if(error){
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
            const { password , newPassword, newPasswordConfirm } = JSON.parse(json)

            updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
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

api.get('/posts/:userId', (req, res) => {
    try {
        const { userId } = req.params

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }
            res.json(posts)
        })

    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

api.post('/posts/:userId/addpost', (req, res) => {
    let json =''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { image, location, title, text } = JSON.parse(json)

            createPost(userId, image, location, title, text, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }
                res.status(201).send()
            })

        } catch(error){
            res.status(400).json({ error: error.message })
        }
    })
})

api.delete('/posts/:userId/deletepost', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

            deletePost(userId, postId, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }
                res.status(204).send()
            })

        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.patch('/posts/:userId/updatepost', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId, image, location, title, text } = JSON.parse(json)

            updatePost(userId, postId, image, location, title, text, error => {
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

api.get('/posts/:userId/post/:postId', (req, res) => {

    const { postId, userId } = req.params
    try {
        retrievePost(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ post })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})





api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))