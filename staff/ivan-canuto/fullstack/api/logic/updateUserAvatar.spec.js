const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
  const id = 'user-1'
  const name = `name-${Math.random()}`
  const avatar = 'user-avatar'
  const password = '123123123'

  const user = [{id, name, avatar, password}]
  const userToJSON = JSON.stringify(user)

  beforeEach(done => writeFile('./data/users.json', userToJSON, 'utf8', error => done(error)))

  it("Should update the user's avatar succesfully", done => {
    updateUserAvatar('user-1', 'new-user-avatar', '123123123', error => {
      expect(error).to.be.null
      
      readFile('./data/users.json', 'utf8', (error, usersJSON) => {
        expect(error).to.be.null

        const users = JSON.parse(usersJSON)
        const user = users.find(user => user.id === 'user-1')

        expect(user.avatar).to.equal('new-user-avatar')
      })
    })

    done()
  })

  it("Should fail on user does not exist", done => {
    updateUserAvatar('user-5', 'new-user-avatar', '123123123', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User does not exist.')
    })

    done()
  })
  
  it("Should fail on new avatar is the same as the old one", done => {
    updateUserAvatar('user-1', 'user-avatar', '123123123', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('New avatar is the same as the old one.')
    })
    
    done()
  })
  
  it("Should fail on incorrect password", done => {
    updateUserAvatar('user-1', 'new-user-avatar', '234234234', error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Incorrect password.')
    })
    
    done()
  })

  after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})