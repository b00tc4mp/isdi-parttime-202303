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
    
    writeFile('./data/users.json', '[]', 'utf8', error => done(error))
  })

  it('Succeds on existing user and correct id', done => {
    const users = [{ id, name, email, password, avatar, favs }]
    const json = JSON.stringify(users)

    writeFile('./data/users.json', json, 'utf8', (error) => {
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

    writeFile('./data/users.json', json, 'utf8', (error) => {
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

    writeFile('./data/users.json', json, 'utf8', (error) => {
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

  it('Fails on callBack is not a function', done => {
    expect(() => retrieveUser('user-1', 'Not a function')).to.throw(Error, 'CallBack is not a function')
    done()
  })
  
  after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})