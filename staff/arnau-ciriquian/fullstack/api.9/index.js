require('dotenv').config()

const express = require('express')
const { registerUser, authenticateUser, getLoggedUser, updateUserAvatar, updateUserEmail, updateUsername, updateUserPassword, deleteAccount, createNewPost, deletePost, retrivePost, retrivePosts, toggleHidePost, toggleFavPost, toggleLikePost, updatePost, updateUserFavs } = require('./logic')

const api = express()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')

    next()
})

api.get('/', (req, res) => res.send('Hello, World!'))

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }))

// USERS DATA
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

api.patch('/users/:userId/favs', (req, res) => {
    try {
        const { userId, postId } = req.params
    
        updateUserFavs(userId, error => {
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

api.delete('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params

        deleteAccount(userId, error => {
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

// POSTS DATA
api.post('/posts/:userId', (req, res) => {

    // hauria de passar el user ID com a data??

    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { image, text } = JSON.parse(json)

            createNewPost(userId, image, text, error => {
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

api.delete('/posts/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params

        deletePost(userId, postId, error => {
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

api.get('/posts/:userId', (req, res) => {
    try {
        const { userId } = req.params     

        retrivePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
})

api.get('/posts/:userId/:postId', (req, res) => {
    try {
        const { userId, postId } = req.params     

        retrivePost(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message })

                return
            }

            res.json(post)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
})

api.patch('/posts/:userId/:postId', (req, res) => {
    let json = ''

    req.on('data', chunk => {
        json += chunk
    })

    req.on('end', () => {

        try {
            const { userId, postId } = req.params
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

api.patch('/posts/:userId/:postId/hide', (req, res) => {
    try {
        const { userId, postId } = req.params
    
        toggleHidePost(userId, postId, error => {
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

api.patch('/posts/:userId/:postId/fav', (req, res) => {
    try {
        const { userId, postId } = req.params
    
        toggleFavPost(userId, postId, error => {
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

api.patch('/posts/:userId/:postId/like', (req, res) => {
    try {
        const { userId, postId } = req.params
    
        toggleLikePost(userId, postId, error => {
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

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))