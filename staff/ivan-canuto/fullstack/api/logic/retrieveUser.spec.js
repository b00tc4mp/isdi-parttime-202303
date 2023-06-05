const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
  const id = 'user-1'
  const name = `name-${Math.random()}`
  const avatar = null
  const favs = '[]'

  const user = [{id, name, avatar, favs}]
  const userToJSON = JSON.stringify(user)

  beforeEach(done => writeFile('./data/users.json', userToJSON, 'utf8', error => done(error)))

  it('Should return the name, the avatar, and the saved posts of the user', done => {
    retrieveUser('user-1', (error, user) => {
      expect(error).to.be.null

      expect(user.name).to.equal(name)
      expect(user.avatar).to.equal(avatar)
      expect(user.favs).to.equal(favs)
      
      done()
    })
  })

  it('Should fail on user does not exist', done => {
    retrieveUser('user-2', (error, user) => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User does not exist.')
      
      done()
    })
  })
})