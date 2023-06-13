require('dotenv').config();

const express = require('express');
const { registerUser, authenticateUser, retrieveUser, deleteUser, updateAvatar, updateName, updateMail, updatePassword, uploadPost, updatePost, retrievePost, retrievePosts, retrieveUserPosts, retrieveFavoritePosts } = require('./logic');

const api = express();

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})

api.post('/users', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        const { mail, username, password, repeatPassword } = JSON.parse(json);

        try {
            registerUser(mail, username, password, repeatPassword, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(201).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

//TODO change userId to auth header

api.post('/users/auth', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { username, password } = JSON.parse(json);

            authenticateUser(username, password, (error, userId) => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.json({ userId });
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(user);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

api.delete('/users/:userId', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    try {
        const { userId } = req.params;
        const { password } = JSON.parse(json);

        deleteUser(userId, password, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.sendStatus(204);
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

api.patch('/users/:userId/avatar', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { userId } = req.params;
            const { newSrc } = JSON.parse(json);

            updateAvatar(newSrc, userId, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(204).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.patch('/users/:userId/name', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { userId } = req.params;
            const { name } = JSON.parse(json);

            updateName(name, userId, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(204).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.patch('/users/:userId/mail', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { userId } = req.params;
            const { mail } = JSON.parse(json);

            updateMail(mail, userId, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(204).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.patch('/users/:userId/password', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { userId } = req.params;
            const { oldPassword, newPassword, repeatPassword } = JSON.parse(json);

            updatePassword(userId, oldPassword, newPassword, repeatPassword, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(204).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.post('/posts', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        const { postImg, postText, authorId } = JSON.parse(json);

        try {
            uploadPost(postImg, postText, authorId, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(201).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.patch('/posts/:postId', (req, res) => {
    let json = '';

    req.on('data', chunk => json += chunk);

    req.on('end', () => {
        try {
            const { postId } = req.params;
            const { newText, newPostImg, userId } = JSON.parse(json);

            updatePost(newText, newPostImg, postId, userId, error => {
                if (error) {
                    res.status(400).json({ error: error.message });
                    return;
                }

                res.status(204).send();
            })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
})

api.get('/posts/:postId', (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = JSON.parse(json);

        retrievePost(userId, postId, (error, post) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(post);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

api.get('/posts', (req, res) => {
    try {
        const { userId } = JSON.parse(json);

        retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(posts);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

api.get('/posts/favs/:userId', (req, res) => {
    try {
        const { userId } = req.params;

        retrieveFavoritePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }

            res.json(posts);
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));
