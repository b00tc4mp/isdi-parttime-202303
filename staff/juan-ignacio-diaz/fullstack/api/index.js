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

api.patch('/users/update/password/:userId', (req, res) => {
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

api.patch('/users/update/avatar/:userId', (req, res) => {
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

api.patch('/users/update/mode/:userId', (req, res) => {
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

api.patch('/users/toggle/savePost/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

            if(postId) {
                toggleSavePost(userId, postId, error => {
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

api.post('/posts/:userId', (req, res) => {
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

api.delete('/posts/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

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

api.get('/posts/retrieve/post/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

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

api.get('/posts/retrieve/onSalePosts/:userId', (req, res) => {
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

api.get('/posts/retrieve/posts/:userId', (req, res) => {
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

api.get('/posts/retrieve/savePosts/:userId', (req, res) => {
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

api.get('/posts/retrieve/userPosts/:userId', (req, res) => {
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

api.patch('/posts/toggle/like/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

            if(postId) {
                toggleLikePost(userId, postId, error => {
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

api.patch('/posts/toggle/lock/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

            if(postId) {
                toggleLockPost(userId, postId, error => {
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

api.patch('/posts/update/post/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId, image, text } = JSON.parse(json)

            if(postId) {
                updatePost(userId, postId, image, text,  error => {
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

api.patch('/posts/update/buy/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId } = JSON.parse(json)

            if(postId) {
                updateBuyPost(userId, postId, error => {
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

api.patch('/posts/update/price/:userId', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk)

    req.on('end', () => {
        try {
            const { userId } = req.params
            const { postId, price } = JSON.parse(json)

            if(postId) {
                updatePricePost(userId, postId, price, error => {
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