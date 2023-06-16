require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const retrievePosts = require('./retrievePosts')

describe('', () => {
  let id, email, password, newPassword, wrongPassword

  beforeEach(done => {
    id = 'user-1'
    email = `email-${Math.random()}`
    password = `password-${Math.random()}`
    newPassword = `newPassword-${Math.random()}`
    wrongPassword = `wrongPassword-${Math.random()}`
  
    const user = [{id, email, password}]
    const userToJSON = JSON.stringify(user)
  
    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, error => done(error))
  })

  
})