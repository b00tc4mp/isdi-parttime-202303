require('dotenv').config()

const { authenticateUser,
    createPost,
    deletePost,
    registerUser,
    retrieveOnSalePosts,
    retrievePost,
    retrievePosts,
    retrieveUser,
    retrieveSavePosts,
    retrieveUsersPosts,
    toggleLockPost,
    toggleLikePost,
    toggleSavePost,
    updateBuyPost,
    updatePost,
    updatePricePost,
    updateUserAvatar,
    updateUserMode,
    updateUserPassword
} = require('./logic')

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

api.post('/users', (req, res) => {
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

api.patch('/users/:userId/update/password', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { password, newPassword, newPasswordConfirm } = JSON.parse(json)

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

api.patch('/users/:userId/update/avatar', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { avatar } = JSON.parse(json)

            if(avatar) {
                updateUserAvatar(userId, avatar, error => {
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

api.patch('/users/:userId/update/mode', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { mode } = JSON.parse(json)

            if(mode) {
                updateUserMode(userId, mode, error => {
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

api.patch('/users/:userId/posts/:postId/toggle/savePost', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params

            toggleSavePost(userId, postId, error => {
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

api.post('/users/:userId/posts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { image, text } = JSON.parse(json)

            createPost(userId, image, text, error => {
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

api.delete('/users/:userId/posts/:postId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params

            if(postId) {
                deletePost(userId, postId, error => {
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

api.get('/users/:userId/posts/:postId/retrieve/post', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params

            if(postId) {
                retrievePost(userId, postId, (error, post) => {
                    if (error) {
                        res.status(400).json({ error: error.message })

                        return
                    }

                    res.json(post)
                })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

api.get('Users/:userId/posts/retrieve/onSalePosts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params

            retrieveOnSalePosts(userId, (error, posts) => {
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
})

api.get('/users/:userId/posts/retrieve/posts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params

            retrievePosts(userId, (error, posts) => {
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
})

api.get('/users/:userId/posts/retrieve/savePosts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params

            retrieveSavePosts(userId, (error, posts) => {
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
})

api.get('/users/:userId/posts/retrieve/userPosts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params

            retrieveUsersPosts(userId, (error, posts) => {
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
})

api.patch('/users/:userId/posts/:postId/toggle/like', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
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
})

api.patch('/users/:userId/posts/:postId/toggle/lock', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params

            toggleLockPost(userId, postId, error => {
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

api.patch('/users/:userId/posts/:postId/update/post', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params
            const { image, text } = JSON.parse(json)

            updatePost(userId, postId, image, text,  error => {
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

api.patch('/users/:userId/posts/:postId/update/buy', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId, postId } = req.params

            updateBuyPost(userId, postId, error => {
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

api.patch('/users/:userId/posts/:postId/update/price', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { price } = JSON.parse(json)

            updatePriceToPost(userId, postId, price, error => {
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

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))