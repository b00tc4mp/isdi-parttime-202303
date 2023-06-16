require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
  let id, name, email, password
  
  beforeEach(done => {
    id = 'user-1'
    name = `name-${Math.random()}`
    email = `email-${Math.random()}`
    password = `password-${Math.random()}`

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
  })

  it('succeeds on existing user', done => {
    const users = [{id, name, email, password}]
    const userToJSON = JSON.stringify(users)
    
    writeFile(`${process.env.DB_PATH}/users.json`,  userToJSON, error => {
      expect(error).to.be.null
      
      authenticateUser(email, password, (error, userId) => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/users.json`, (error, usersJSON) => {
          expect(error).to.be.null
          const users = JSON.parse(usersJSON)
          const user = users.find(user => user.id === userId)
          
          expect(userId).to.be.a('string')
          expect(userId).to.equal(user.id)
          
          done()
        })
      })
    })
  })



  it('fails on non-existing user', done => {
    const newEmail = `email-${Math.random()}`

    authenticateUser(newEmail, password, (error, userId) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`User with email ${newEmail} does not exist`)

      done()
    })
  })
  
  it('fails on existing user but wrong password', done => {
    const users = [{id, name, email, password}]
    const userToJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, (error) => {
      expect(error).to.be.null
      
      const newPassword = `password-${Math.random()}`
  
      authenticateUser(email, newPassword, (error, userId) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Incorrect password.')
  
        done()
      })
    })
    
  })

  it('fails on empty email', () => expect(() => authenticateUser('', password, () => { })).to.throw(Error, 'The email field is empty.'))

  it('fails on a non-string email', () => {
    const users = [{id, name, email, password}]
    const userToJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, (error) => {
      expect(error).to.be.null

      expect(() => authenticateUser(true, password, () => { })).to.throw(Error, 'The email is not a string.')
      expect(() => authenticateUser([], password, () => { })).to.throw(Error, 'The email is not a string.')
      expect(() => authenticateUser({}, password, () => { })).to.throw(Error, 'The email is not a string.')
      expect(() => authenticateUser(undefined, password, () => { })).to.throw(Error, 'The email is not a string.')
      expect(() => authenticateUser(1, password, () => { })).to.throw(Error, 'The email is not a string.')
    })  
  })

  it('fails on empty password', () => {
    const users = [{id, name, email, password}]
    const userToJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, (error) => {
      expect(error).to.be.null

      expect(() => authenticateUser(email, '', () => { })).to.throw(Error, 'The password field is empty.')
    })
  })

  it('fails on a non-string password', () => {
    const users = [{id, name, email, password}]
    const userToJSON = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, (error) => {
      expect(error).to.be.null

      expect(() => authenticateUser(email, true, () => { })).to.throw(Error, 'The password is not a string.')
      expect(() => authenticateUser(email, [], () => { })).to.throw(Error, 'The password is not a string.')
      expect(() => authenticateUser(email, {}, () => { })).to.throw(Error, 'The password is not a string.')
      expect(() => authenticateUser(email, undefined, () => { })).to.throw(Error, 'The password is not a string.')
      expect(() => authenticateUser(email, 1, () => { })).to.throw(Error, 'The password is not a string.')
    })
  })

  it('Fails on callBack is not a function', done => {
    expect(() => authenticateUser(email, password, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    done()
  })

  after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})