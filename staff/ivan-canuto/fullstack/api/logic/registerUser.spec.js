const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
  beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

  it('Should succeed on new user', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `password-${Math.random()}`
    const passwordConfirm = password

    registerUser(name, email, password, passwordConfirm, (error) => {
      expect(error).to.be.null
      
      readFile('./data/users.json', 'utf8', (error, usersJSON) => {
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

  it('Should show an error of existing user', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `password-${Math.random()}`
    const passwordConfirm = password

    const user = [{name, email, password, passwordConfirm}]
    const userToJSON = JSON.stringify(user)

    writeFile('./data/users.json', userToJSON, 'utf8', error => {
      expect(error).to.be.null
      
      registerUser(name, email, password, passwordConfirm, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`User with email ${email} already exists.`)

        done()
      })
    })
  })

  it('Should show error on password too short.', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `12345`
    const passwordConfirm = password

    registerUser(name, email, password, passwordConfirm, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`The password is too short.`)

      done()
    })
  })

  it('Should show error on passwords do not match.', done => {
    const name = `name-${Math.random()}`
    const email = `email-${Math.random()}`
    const password = `1234567`
    const passwordConfirm = `2345678`

    registerUser(name, email, password, passwordConfirm, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal(`The passwords do not match.`)

      done()
    })
  })

  after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})