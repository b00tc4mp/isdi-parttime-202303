require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const createPost = require('./createPost')

describe('', () => {
  let userId, userName, postText

  beforeEach(done => {
    userId = `user-id-${Math.round(Math.random() * 10)}`
    userName = `user-name-${Math.round(Math.random() * 10)}`
    postText = `post-text-${Math.round(Math.random() * 100)}`
  
    const user = [{userId, userName}]
    const userToJSON = JSON.stringify(user)
  
    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, error => done(error))
  })

  
})