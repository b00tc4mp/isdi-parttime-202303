require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
  let id, name, email, password, avatar, favs
  
  beforeEach(done => {
    id = 'user-1'
    name = `name-${Math.random()}`
    email = `email-${Math.random()}`
    password = `password-${Math.random()}`
    avatar = `avatar-${Math.random()}`
    favs = '[]'
    
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
  })

  it('Succeds on existing user and correct id', done => {
    const users = [{ id, name, email, password, avatar, favs }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      retrieveUser('user-1', (error, user) => {
        expect(error).to.be.null

        expect(user.name).to.equal(name)
        expect(user.avatar).to.equal(avatar)
        expect(user.favs).to.equal(favs)
        
        done()
      })
    })
  })
  
  it('Succeds on existing user with no avatar and correct id', done => {
    const users = [{ id, name, email, password, avatar: null, favs }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      retrieveUser('user-1', (error, user) => {
        expect(error).to.be.null

        expect(user.name).to.equal(name)
        expect(user.avatar).to.be.null
        expect(user.favs).to.equal(favs)
        
        done()
      })
    })
  })
  
  it('Fails on existing user but incorrect id', done => {
    const users = [{ id, name, email, password, avatar, favs }]
    const json = JSON.stringify(users)

    const wrongId = id + 'wrong'

    writeFile(`${process.env.DB_PATH}/users.json`, json, (error) => {
      retrieveUser(wrongId, (error, user) => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User does not exist.')

        expect(user).to.be.undefined
        
        done()
      })
    })
  })

  it('Fails on user does not exist', done => {
    retrieveUser('user-1', (error, user) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User does not exist.')

      expect(user).to.be.undefined
      
      done()
    })
  })

  it('Fails on empty userr id field', () => {
    const users = [{ id, name, email, password, avatar, favs }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
      expect(error).to.be.null

      expect(() => retrieveUser('', () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })

  it('Fails on a non-string password', () => {
    const users = [{ id, name, email, password, avatar, favs }]
    const json = JSON.stringify(users)

    writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
      expect(error).to.be.null
      
      expect(() => retrieveUser(true, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveUser([], () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveUser({}, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveUser(undefined, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveUser(1, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })

  it('Fails on callBack is not a function', done => {
    expect(() => retrieveUser('user-1', 'Not a function')).to.throw(Error, 'CallBack is not a function')
    done()
  })
  
  after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})