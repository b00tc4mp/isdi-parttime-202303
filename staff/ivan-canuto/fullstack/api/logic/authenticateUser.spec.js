require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')
const { cleanUp, generate, populate } = require('./helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError, AuthError } } = require('com')
const { User } = require('../data/models')

describe('authenticateUser', () => {
  let user, name, email, password

  before(done => {
    mongoose.connect(process.env.MONGODB_URL)
      .then(() => done())
      .catch(done)
  })
  
  beforeEach(done => {
    user = generate.user()
    name = user.name
    email = user.email
    password = user.password

    cleanUp()
      .then(() => done())
      .catch(done)
  })

  it('succeeds on existing user', () => {
    return populate(user, [])
      .then(() => authenticateUser(email, password))
      .then(userId => {
        return User.findOne({ _id: userId })
          .then(_user => {
            expect(userId).to.be.a('string')
            expect(userId).to.equal(_user.id)
          })
      })
  })



  it('fails on non-existing user', () => {
    const newEmail = email + 'wrong'
    
    return populate(user, [])
      .then(() => authenticateUser(newEmail, password))
      .catch(error => {
        expect(error).to.be.instanceOf(ExistenceError)
        expect(error.message).to.equal(`User not found.`)
      })
  })
  
  it('fails on existing user but wrong password', () => {
    const newPassword = password + 'wrong'
    
    return populate(user, [])
      .then(() => authenticateUser(email, newPassword))
      .catch(error => {
        expect(error).to.be.instanceOf(AuthError)
        expect(error.message).to.equal('Wrong credentials.')
      })
  })

  it('fails on empty email', () => expect(() => authenticateUser('', password)).to.throw(ContentError, 'The email field is empty.'))

  it('fails on a non-string email', () => {
    expect(() => authenticateUser(true, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => authenticateUser([], password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => authenticateUser({}, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => authenticateUser(undefined, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => authenticateUser(1, password)).to.throw(TypeError, 'The email is not a string.')
  })

  it('fails on empty password', () => {
    expect(() => authenticateUser(email, '')).to.throw(RangeError, 'The password is lower than 6 characters.')
  })

  it('fails on a non-string password', () => {
    expect(() => authenticateUser(email, true)).to.throw(TypeError, 'The password is not a string.')
    expect(() => authenticateUser(email, [])).to.throw(TypeError, 'The password is not a string.')
    expect(() => authenticateUser(email, {})).to.throw(TypeError, 'The password is not a string.')
    expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'The password is not a string.')
    expect(() => authenticateUser(email, 1)).to.throw(TypeError, 'The password is not a string.')
  })

  after(done => {
    cleanUp()
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done)
  })
})