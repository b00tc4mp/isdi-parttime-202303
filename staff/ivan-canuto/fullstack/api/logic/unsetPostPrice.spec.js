require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const unsetPostPrice = require('./unsetPostPrice')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  
})