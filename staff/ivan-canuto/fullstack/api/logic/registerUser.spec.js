require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./registerUser')
const { populate, generate, cleanUp } = require('./helpers-test')
const { User , Post } = require('../data/models')
const mongoose = require('mongoose')

describe('registerUser', () => {
  let name, email, password

  before(done => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => done())
    .catch(done)
  })

  let user

  // beforeEach(() =>{
  //   user = generate.user()

  //   return cleanUp()
  // })

  beforeEach(done => {
    user = generate.user()
  
    cleanUp()
      .then(() => done())
      .catch(done)
  });

  it('Succeeds on new user', () => {
    return registerUser(user.name, user.email, user.password)
      .then(User.find({ email: user.email }))
      .then(_user => {
        expect(_user).to.exist
        expect(_user.id).to.be.a('string')
        expect(_user.name).to.equal(user.name)
        expect(_user.email).to.equal(user.email)
        expect(_user.password).to.equal(user.password)
        expect(_user.avatar).to.be.null
        expect(_user.favs).to.have.lengthOf(0)
      })
  })
  
  it('Succeeds on other existing user', () => {
    const user2 = generate.user()
    const users = [user2]

    return populate(users, [])
    .then(() => registerUser(user.name, user.email, user.password))
    // .then(User.find().then(users => console.log(users)))
    .then(() => User.find({ email: user.email }))
    .then(_user => {
      // console.log(_user.email, 'getted user')
      // console.log(user.email, 'user')
      // console.log(user2.email, 'user2')
      expect(_user).to.exist
      expect(_user.id).to.be.a('string')
      expect(_user.name).to.equal(user.name)
      expect(_user.email).to.equal(user.email)
      expect(_user.password).to.equal(user.password)
      expect(_user.avatar).to.be.null
      expect(_user.favs).to.have.lengthOf(0)
    })
    .then(() => User.find({ email: user2.email }))
    .then(_user => {
      expect(_user).to.exist
      expect(_user.id).to.be.a('string')
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
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`User with email ${email} already exists.`)
    })
  })

  it('Should fail on non-existing user but password too short.', () => {
    return registerUser(user.name, user.email, user.password)
      .catch(error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`The password is too short.`)
      })
  })

  it('fails on empty name', () => expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'Name field is empty.'))

  it('fails on a non-string name', () => {
    expect(() => registerUser(true, email, password, () => { })).to.throw(Error, 'Name is not a string.')
    expect(() => registerUser([], email, password, () => { })).to.throw(Error, 'Name is not a string.')
    expect(() => registerUser({}, email, () => { })).to.throw(Error, 'Name is not a string.')
    expect(() => registerUser(undefined, email, password, () => { })).to.throw(Error, 'Name is not a string.')
    expect(() => registerUser(1, email, password, () => { })).to.throw(Error, 'Name is not a string.')
  })

  it('fails on empty email', () => expect(() => registerUser(name,'', password, () => { })).to.throw(Error, 'The email field is empty.'))

  it('fails on a non-string email', () => {
    expect(() => registerUser(name ,true, password, () => { })).to.throw(Error, 'The email is not a string.')
    expect(() => registerUser(name ,[], password, () => { })).to.throw(Error, 'The email is not a string.')
    expect(() => registerUser(name ,{}, password, () => { })).to.throw(Error, 'The email is not a string.')
    expect(() => registerUser(name ,undefined, password, () => { })).to.throw(Error, 'The email is not a string.')
    expect(() => registerUser(name, 1, password, () => { })).to.throw(Error, 'The email is not a string.')
  })

  it('fails on empty password', () => expect(() => registerUser(name, email, '', () => { })).to.throw(Error, 'The password field is empty.'))

  it('fails on a non-string password', () => {
    expect(() => registerUser(name, email, true, () => { })).to.throw(Error, 'The password is not a string.')
    expect(() => registerUser(name, email, [], () => { })).to.throw(Error, 'The password is not a string.')
    expect(() => registerUser(name, email, {}, () => { })).to.throw(Error, 'The password is not a string.')
    expect(() => registerUser(name, email, undefined, () => { })).to.throw(Error, 'The password is not a string.')
    expect(() => registerUser(name, email, 1, () => { })).to.throw(Error, 'The password is not a string.')
  })

  after(function(done) {
    mongoose.disconnect()
      .then(() => done())
      .catch(done)
  })
})