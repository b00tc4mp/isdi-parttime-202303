const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword, createPost, createComment, buyPost, deleteComment, deletePost, removePostFromSale, retrievePost, retrievePosts, retrieveSavedPosts, retrieveUserPosts, toggleLikePost, toggleSavePost, setPostPrice, unsetPostPrice, toggleVisibilityPost, updatePost } = require('./logic')

require('dotenv').config()

const api = express()

api.get('/', (req, res) => res.send('Hello, world!'))

api.get('/helloworld', (req, res) => res.json({ hello: 'world'}))

api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  next()
})

api.post('/users', (req, res) => {
  let json= ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    const { name, email, password } = JSON.parse(json)

    try {
      registerUser(name, email, password, error => {
        if(error) {
          res.status(400).json({ error: error.message })
          
          return
        }
        
        res.send()
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
})

api.post('/users/auth', (req, res) => {
  let json= ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    const { email, password } = JSON.parse(json)

    try {
      authenticateUser(email, password, (error, userId) => {
        if(error) {
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
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      
      res.status(201).json(user)
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/users/:userId', (req, res) => {
  let json= ''

  req.on('data', chunk => json += chunk)
  
  req.on('end', () => {
    try {
      const { userId } = req.params
      const { newAvatarUrl, password } = JSON.parse(json)

      updateUserAvatar(userId, newAvatarUrl, password, error => {
        if(error) {
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

api.patch('/posts/buyPost/:postId', (req, res) => {
  try {
    const { postId } = req.params

    buyPost(postId, error => {
      if(error) {
        res.status(400).json({error: error.message})

        return
      }

      res.send()  
    })
  } catch (error) {
    res.status(400).json({erro: error.message})
  }
})

api.patch('/posts/createComment/:userId/:postId', (req, res) => {
  let json = ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    try {
    const { userId, postId } = req.params
    const { commentText } = JSON.parse(json)

      createComment(commentText, userId, postId, error => {
        if(error) {
          res.status(400).json({error: error.message})
          
          return
        }

        res.send()
      })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  })
})

api.post('/posts/createPost/:userId', (req, res) => {
  let json = ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    const { userId } = req.params
    const { imageUrl, postText } = JSON.parse(json)

    try {
      
      createPost(userId, imageUrl, postText, error => {
        if(error) {
          res.status(400).json({ error: error.message })
        }

        res.send()
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
})

api.patch('/posts/deleteComment/:postId/:commentId', (req, res) => {
  try {
    const { postId, commentId } = req.params

    deleteComment(postId, commentId, error => {
      if(error) {
        res.status(400).json({ error: error.message })
      }
      
      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.delete('/posts/deletePost/:postId/:userId', (req, res) => {
  
  const { postId , userId } = req.params

  try {
    deletePost(postId, userId, error => {
      if(error) {
        res.status(400).json({ error: error.message})

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/post/removePostFromSale/:postId', (req, res) => {
  try {
    const { postId } = req.params
    
    removePostFromSale(postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      
      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.get('/posts/retrievePost/:userId/:postId', (req, res) => {
  try {
    const { userId, postId } = req.params

    retrievePost(userId, postId, (error, post) => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      
      res.json({ post })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.get('/posts/retrievePosts/:userId', (req, res) => {
  try {
    const { userId } = req.params

    retrievePosts(userId, (error, posts) => {
      if(error) {
        res.status(400).json({ error: error.message })
        
        return
      }
      
      res.json({ posts })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.get('/posts/retrieveSavedPosts/:userId', (req, res) => {
  try {
    const { userId } = req.params
  
    retrieveSavedPosts(userId, (error, savedPosts) => {
      if(error) {
        res.status(400).json({ error: error.message })
  
        return
      }
  
      res.json({ savedPosts })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.get('/posts/retrieveUserPosts/:userId', (req, res) => {
  try {
    const { userId } = req.params
  
    retrieveUserPosts(userId, (error, userPosts) => {
      if(error) {
        res.status(400).json({ error: error.message })
  
        return
      }
  
      res.json({ userPosts })
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/posts/toggleLikePost/:userId/:postId', (req, res) => {
  try {
    const { userId, postId } = req.params
    
    toggleLikePost(userId, postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/posts/setPostPrice/:postId', (req, res) => {
  let json = ''
  
  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    try {
      const { postPrice } = JSON.parse(json)
      const { postId } = req.params

      setPostPrice(postId, postPrice, error => {
        if(error) {
          res.status(400).json({ error: error.message })

          return
        }
        
        res.send()
      })  
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
})

api.patch('/posts/unsetPostPrice/:postId', (req, res) => {
  try {
    const { postId } = req.params

    unsetPostPrice(postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })

        return
      }
      
      res.send()
    })  
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/posts/toggleSavePost/:userId/:postId', (req, res) => {
  try {
    const { userId, postId } = req.params

    toggleSavePost(userId, postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/posts/toggleVisibilityPost/:postId', (req, res) => {
  try {
    const { postId } = req.params
    
    toggleVisibilityPost(postId, error => {
      if(error) {
        res.status(400).json({ error: error.message })

        return
      }

      res.send()
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

api.patch('/posts/updatePost/:userId/:postId', (req, res) => {
  let json = ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    const { imageUrl, postText } = JSON.parse(json)
    const { userId, postId } = req.params

    try {
      updatePost(userId, postId, imageUrl, postText, error => {
        if(error) {
          res.status(400).json({ error: error.message })

        return
      }
      
      res.send()
    })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
})

api.patch('/users/updateUserPassword/:userId', (req, res) => {
  let json = ''

  req.on('data', chunk => json += chunk)

  req.on('end', () => {
    try {
      const { password, newPassword, newPasswordConfirm } = JSON.parse(json)
      const { userId } = req.params

      updateUserPassword(userId, password, newPassword, newPasswordConfirm, error => {
        if(error) {
          res.status(400).json({ error: error.message })
          
          return
        }

        res.send()
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })
})

api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))