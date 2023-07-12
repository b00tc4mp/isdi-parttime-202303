require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./registerUser')
const { populate, generate, cleanUp } = require('./helpers-test')
const { User } = require('../data/models')
const mongoose = require('mongoose')
const { errors: { DuplicityError, ContentError } } = require('com')
const { Types: { ObjectId } } = mongoose

describe('registerUser', () => {
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
  });

  it('Succeeds on new user', () => {
    return registerUser(name, email, password)
      .then(User.findOne({ email: email }))
      .then(_user => {
        expect(_user).to.exist
        expect(_user.id).to.be.a('string')
        expect(_user._id).to.be.an.instanceof(ObjectId)
        expect(_user.name).to.equal(name)
        expect(_user.email).to.equal(email)
        expect(_user.password).to.equal(password)
        expect(_user.avatar).to.be.null
        expect(_user.favs).to.have.lengthOf(0)
      })
  })
  
  it('Succeeds on other existing user', () => {
    const user2 = generate.user()

    return populate(user2, [])
      .then(() => registerUser(name, email, password))
      .then(() => User.findOne({ email: email }))
      .then(_user => {
        expect(_user).to.exist
        expect(_user.id).to.be.a('string')
        expect(_user._id).to.be.an.instanceof(ObjectId)
        expect(_user.name).to.equal(name)
        expect(_user.email).to.equal(email)
        expect(_user.password).to.equal(password)
        expect(_user.avatar).to.be.null
        expect(_user.favs).to.have.lengthOf(0)
      })
      .then(() => User.findOne({ email: user2.email }))
      .then(_user => {
        expect(_user).to.exist
        expect(_user.id).to.be.a('string')
        expect(_user._id).to.be.an.instanceof(ObjectId)
        expect(_user.name).to.equal(user2.name)
        expect(_user.email).to.equal(user2.email)
        expect(_user.password).to.equal(user2.password)
        expect(_user.avatar).to.be.null
        expect(_user.favs).to.have.lengthOf(0)
      })
  })

  it('Fails on existing user', () => {
    const users = [user]

    return populate(users, [])
      .then(() => registerUser(name, email, password))
      .catch(error => {
        expect(error).to.be.instanceOf(DuplicityError)
        expect(error.message).to.equal(`User with email ${email} already exists.`)
      })
  })

  it('Should fail on non-existing user but password too short.', () => {
    return registerUser(name, email, password)
      .catch(error => {
        expect(error).to.be.instanceOf(RangeError)
        expect(error.message).to.equal(`The password is lower than 6 characters.`)
      })
  })

  it('fails on empty name', () => expect(() => registerUser('', email, password)).to.throw(ContentError, 'Name field is empty.'))

  it('fails on a non-string name', () => {
    expect(() => registerUser(true, email, password)).to.throw(TypeError, 'Name is not a string.')
    expect(() => registerUser([], email, password)).to.throw(TypeError, 'Name is not a string.')
    expect(() => registerUser({}, email)).to.throw(TypeError, 'Name is not a string.')
    expect(() => registerUser(undefined, email, password)).to.throw(TypeError, 'Name is not a string.')
    expect(() => registerUser(1, email, password)).to.throw(TypeError, 'Name is not a string.')
  })

  it('fails on empty email', () => expect(() => registerUser(name,'', password)).to.throw(ContentError, 'The email field is empty.'))

  it('fails on a non-string email', () => {
    expect(() => registerUser(name ,true, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => registerUser(name ,[], password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => registerUser(name ,{}, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => registerUser(name ,undefined, password)).to.throw(TypeError, 'The email is not a string.')
    expect(() => registerUser(name, 1, password)).to.throw(TypeError, 'The email is not a string.')
  })

  it('fails on empty password', () => expect(() => registerUser(name, email, '')).to.throw(RangeError, 'The password is lower than 6 characters.'))

  it('fails on a non-string password', () => {
    expect(() => registerUser(name, email, true)).to.throw(TypeError, 'The password is not a string.')
    expect(() => registerUser(name, email, [])).to.throw(TypeError, 'The password is not a string.')
    expect(() => registerUser(name, email, {})).to.throw(TypeError, 'The password is not a string.')
    expect(() => registerUser(name, email, undefined)).to.throw(TypeError, 'The password is not a string.')
    expect(() => registerUser(name, email, 1)).to.throw(TypeError, 'The password is not a string.')
  })

  after(done => {
    cleanUp()
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done)
  })
})