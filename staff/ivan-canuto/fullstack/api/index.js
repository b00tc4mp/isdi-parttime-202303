const express = require('express')
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar } = require('./logic')

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

api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))