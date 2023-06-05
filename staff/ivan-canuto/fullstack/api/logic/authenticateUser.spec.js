const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')
const registerUser = require('./registerUser')

describe('authenticateUser', () => {
  const id = 'user-1'
  const name = `name-${Math.random()}`
  const email = `email-${Math.random()}`
  const password = `password-${Math.random()}`
  
  const user = [{id, name, email, password}]
  const userToJSON = JSON.stringify(user)

  beforeEach(done => writeFile('./data/users.json', userToJSON, 'utf8', error => done(error)))

  it('shoud succed on existing user', done => {
      authenticateUser(email, password, (error, userId) => {
        expect(error).to.be.null
        
        readFile('./data/users.json', 'utf8', (error, usersJSON) => {
          expect(error).to.be.null
          const users = JSON.parse(usersJSON)
          const user = users.find(user => user.id === userId)
          
          expect(userId).to.be.a('string')
          expect(userId).to.equal(user.id)

          done()
        })
      })
    })

  it('should fail on user does not exist', done => {
    const newEmail = `email-${Math.random()}`

    authenticateUser(newEmail, password, (error, userId) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`User with email ${newEmail} does not exist`)

      done()
    })
  })
  
  it('should fail on wrong password', done => {
    const newPassword = `password-${Math.random()}`
    authenticateUser(email, newPassword, (error, userId) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Incorrect password.')

      done()
    })
  })

  after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})