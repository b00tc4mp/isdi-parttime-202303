const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserPassword = require('./updateUserPassword')

require('dotenv').config()
let id, email, password, newPassword, wrongPassword

describe('updateUserPassword', () => {
  id = 'user-1'
  email = `email-${Math.random()}`
  password = `password-${Math.random()}`
  newPassword = `newPassword-${Math.random()}`
  wrongPassword = `wrongPassword-${Math.random()}`

  const user = [{id, email, password}]
  const userToJSON = JSON.stringify(user)

  beforeEach(done => writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, error => done(error)))

  it('Should change the user password successfully', done => {
    updateUserPassword(id, password, newPassword, newPassword, error => {
      expect(error).to.be.null
      
      readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
        expect(error).to.be.null

        const users = JSON.parse(usersJSON)
        const user = users.find(user => user.id === id)

        expect(user.password).to.equal(newPassword)

        done()
      })
    })
  })

  it('Fails on user not found', done => {
    updateUserPassword('wrong-user-id', password, newPassword, newPassword, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User not found.')

      done()
    })
  })
  
  it('Should fail on incorrect password', done => {
    updateUserPassword(id, wrongPassword, newPassword, newPassword, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Incorrect password.')

      done()
    })
  })
  
  it('Should fail on the new password is the same as the old one', done => {
    updateUserPassword(id, password, password, password, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('The new password is the same as the old one.')

      done()
    })
  })
  
  it('Should fail on the new password too is short', () => {
    expect(() => updateUserPassword(id, password, '1234', '1234', () => {})).to.throw(Error, 'The new password is too short.')
  })

  it('Should fail on the new passwords do not match', () => {
    expect(() => updateUserPassword(id, password, newPassword, wrongPassword, () => {})).to.throw(Error, 'The new passwords do not match.')
  })
  
  it('Fails on user id field empty', () => {
    expect(() => updateUserPassword('', password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id field is empty.')
  })

  it('Fails on a non-string id', () => {
    expect(() => updateUserPassword(true, password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserPassword([], password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserPassword({}, password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserPassword(undefined, password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserPassword(1, password, newPassword, newPassword, () => {})).to.throw(Error, 'The user id is not a string.')
  })

  it('Fails on password field empty', () => {
    expect(() => updateUserPassword(id, '', newPassword, newPassword, () => {})).to.throw(Error, 'The password field is empty.')
  })

  it('Fails on a non-string password', () => {
    expect(() => updateUserPassword(id, true, newPassword, newPassword, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserPassword(id, [], newPassword, newPassword, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserPassword(id, {}, newPassword, newPassword, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserPassword(id, undefined, newPassword, newPassword, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserPassword(id, 1, newPassword, newPassword, () => {})).to.throw(Error, 'The password is not a string.')
  })

  it('Fails on new password field empty', () => {
    expect(() => updateUserPassword(id, password, '', newPassword, () => {})).to.throw(Error, 'The new password field is empty.')
  })

  it('Fails on a non-string new password', () => {
    expect(() => updateUserPassword(id, password, true, newPassword, () => {})).to.throw(Error, 'The new password is not a string.')
    expect(() => updateUserPassword(id, password, [], newPassword, () => {})).to.throw(Error, 'The new password is not a string.')
    expect(() => updateUserPassword(id, password, {}, newPassword, () => {})).to.throw(Error, 'The new password is not a string.')
    expect(() => updateUserPassword(id, password, undefined, newPassword, () => {})).to.throw(Error, 'The new password is not a string.')
    expect(() => updateUserPassword(id, password, 1, newPassword, () => {})).to.throw(Error, 'The new password is not a string.')
  })

  it('Fails on new password confirm field empty', () => {
    expect(() => updateUserPassword(id, password, newPassword, '', () => {})).to.throw(Error, 'The new password confirm field is empty.')
  })
  
  it('Fails on a non-string new password confirm', () => {
    expect(() => updateUserPassword(id, password, newPassword, true, () => {})).to.throw(Error, 'The new password confirm is not a string.')
    expect(() => updateUserPassword(id, password, newPassword, [], () => {})).to.throw(Error, 'The new password confirm is not a string.')
    expect(() => updateUserPassword(id, password, newPassword, {}, () => {})).to.throw(Error, 'The new password confirm is not a string.')
    expect(() => updateUserPassword(id, password, newPassword, undefined, () => {})).to.throw(Error, 'The new password confirm is not a string.')
    expect(() => updateUserPassword(id, password, newPassword, 1, () => {})).to.throw(Error, 'The new password confirm is not a string.')
  })

  it('Fails on callBack is not a function', () => {
    expect(() => updateUserPassword(id, password, newPassword, newPassword, 'Not a function')).to.throw(Error, 'CallBack is not a function')
  })

  after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})