const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserPassword = require('./updateUserPassword')

describe('updateUserPassword', () => {
  const id = 'user-1'
  const email = `email-${Math.random()}`
  const password = '123123123'

  const user = [{id, email, password}]
  const userToJSON = JSON.stringify(user)

  beforeEach(done => writeFile('./data/users.json', userToJSON, error => done(error)))

  it('Should change the user password successfully', done => {
    updateUserPassword('user-1', '123123123', '345345345', '345345345', error => {
      expect(error).to.be.null
      
      readFile('./data/users.json', (error, usersJSON) => {
        expect(error).to.be.null

        const users = JSON.parse(usersJSON)
        const user = users.find(user => user.id === 'user-1')

        expect(user.password).to.equal('345345345')

        done()
      })
    })
  })

  it('Should fail on user not found', done => {
    updateUserPassword('user-4', '123123123', '345345345', '345345345', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found.')

      done()
    })
  })
  
  it('Should fail on incorrect password', done => {
    updateUserPassword('user-1', '234567890', '345345345', '345345345', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Incorrect password.')

      done()
    })
  })
  
  it('Should fail on the new password is the same as the old one', done => {
    updateUserPassword('user-1', '123123123', '123123123', '123123123', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('The new password is the same as the old one.')

      done()
    })
  })
  
  it('Should fail on the new password is short', done => {
    updateUserPassword('user-1', '123123123', '1234', '1234', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('The new password is too short.')

      done()
    })
  })
  
  it('Should fail on the new passwords do not match', done => {
    updateUserPassword('user-1', '123123123', '345345345', '678678678', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('The new passwords do not match.')

      done()
    })
  })

  after(done => writeFile('./data/users.json', '[]', error => done(error)))
})