const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
  let name, email, password

  beforeEach(done =>{
    name = `name-${Math.random()}`
    email = `email-${Math.random()}`
    password = `password-${Math.random()}`

    writeFile('./data/users.json', '[]', error => done(error))
  })

  it('Succeeds on new user', done => {
    registerUser(name, email, password, (error) => {
      expect(error).to.be.null
      
      readFile('./data/users.json', (error, usersJSON) => {
        expect(error).to.be.null
        
        const users = JSON.parse(usersJSON)
        const user = users.find(user => user.email === email)

        expect(user).to.exist
        expect(user.id).to.be.a('string')
        expect(user.name).to.equal(name)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        expect(user.avatar).to.be.null
        expect(user.favs).to.have.lengthOf(0)

        done()
      })
    })
  })

  it('Fails on existing user', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `password-${Math.random()}`

    const user = [{name, email, password}]
    const userToJSON = JSON.stringify(user)

    writeFile('./data/users.json', userToJSON, error => {
      expect(error).to.be.null
      
      registerUser(name, email, password, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`User with email ${email} already exists.`)

        done()
      })
    })
  })

  it('Should fail on non-existing user but password too short.', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `12345`

    registerUser(name, email, password, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`The password is too short.`)

      done()
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

  after(done => writeFile('./data/users.json', '[]', error => done(error)))
})