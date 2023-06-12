require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateAvatar, updateEmail, updatePassword, createPost, retrievePosts, updatePost, retrievePost, deletePost, toggleLikePost, toggleSavePost, togglePostVisibility, retrieveSavedPosts } = require('./logic')
const { use } = require('chai')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.get('/', (req, res) => res.send(`Hello, I'm a working api!`))

api.get('/whoami', (req, res) => res.json({ name: 'lara', age: '24', hobby: 'ceramic' }))

//register user
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

//authenticate user
api.post('/users/auth', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        const user = JSON.parse(json)

        try {
            authenticateUser(user.email, user.password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message })

                    return
                }

                res.status(200).json({ userId })
            })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//retrieve user
api.get('/users/:userId', (req, res) => {
    const { userId } = req.params
    try {
        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ user })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//update avatar
api.patch('/users/avatar/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { avatar } = JSON.parse(json)

            updateAvatar(userId, avatar, error => {
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

//update email
api.patch('/users/email/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { email, newEmail } = JSON.parse(json)

            updateEmail(userId, email, newEmail, error => {
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

//update password
api.patch('/users/password/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { password, newPassword } = JSON.parse(json)
            updatePassword(userId, password, newPassword, error => {
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

//create post
api.post('/posts/create/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        const { userId } = req.params
        const { image, text } = JSON.parse(json)
        try {
            createPost(userId, image, text, error => {
                if(error){
                    res.status(400).json({error: error.message})
                    return
                }

                res.status(201).send()
            })
        } catch(error){
            res.status(400).json({error: error.message})
        }
    })
})

//retrievePosts
api.get('/posts/:userId', (req, res) => {
    const { userId } = req.params
    try {
        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ posts })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//retrieve post
api.get('/posts/post/:postId/user/:userId', (req, res) => {

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

//retrieve saved posts
api.get('/posts/saved/:userId', (req, res) => {
    const { userId } = req.params
    try {
        retrieveSavedPosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.status(200).json({ posts })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//update post
api.patch('/posts/:postId/users/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { postId, userId } = req.params
            const { image, text } = JSON.parse(json)
            updatePost(userId, postId, image, text, error => {
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

//delete post
api.delete('/posts/delete', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try{
        const { userId, postId } = JSON.parse(json)

        deletePost(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })

                return
            }
            
            res.status(204).send()
        })
        } catch(error){
            res.status(400).json({ error: error.message })
        }
    })
})

//toggle like post
api.patch('/posts/like/:postId/users/:userId', (req, res) => {
    try{
        const { postId, userId } = req.params

        toggleLikePost(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
})

//toggle save post
api.patch('/posts/save/:postId/users/:userId', (req, res) => {
    try{
        const { postId, userId } = req.params

        toggleSavePost(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })
            }

            res.status(201).send()
        })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
})

//toggle post visibility
api.patch('/posts/visibility/:postId/users/:userId', (req, res) => {
    try{
        const { postId, userId } = req.params
        togglePostVisibility(userId, postId, error => {
            if(error){
                res.status(400).json({ error: error.message })
    
                return
            }

            res.status(201).send()
        })
    } catch(error){
        res.status(400).json({ error: error.message })
    }
})

api.listen(4000)