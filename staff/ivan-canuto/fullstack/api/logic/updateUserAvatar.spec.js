const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

require('dotenv').config()

describe('updateUserAvatar', () => {
  let id, name, currentAvatar, password, newAvatar

  beforeEach(done => {
    id = 'user-1'
    name = `name-${Math.random()}`
    currentAvatar = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdH2Q==.jpeg`
    password = `password-${Math.random()}`
    newAvatar = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC.jpg`

    const user = [{id, name, currentAvatar, password}]
    const userToJSON = JSON.stringify(user)

    writeFile(`${process.env.DB_PATH}/users.json`, userToJSON, error => done(error))
  })
  
  it("Updates the user's avatar succesfully", done => {
    updateUserAvatar(id, newAvatar, password, error => {
      expect(error).to.be.null
      
      readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        expect(error).to.be.null

        const users = JSON.parse(json)
        const user = users.find(user => user.id === 'user-1')

        expect(user).to.exist
        expect(user.currentAvatar).to.equal(newAvatar)
        
        done()
      })
    })
  })

  it("Should fail on user does not exist", done => {
    updateUserAvatar('wrong-user-id', newAvatar, password, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('User does not exist.')
      
      done()
    })
  })
  
  it("Should fail on new avatar is the same as the old one", done => {
    updateUserAvatar(id, currentAvatar, password, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('New avatar is the same as the old one.')
      
      done()  
    })
  })
  
  it("Should fail on incorrect password", done => {
    const wrongPassword = `wrong-password-${Math.random()}`

    updateUserAvatar(id, newAvatar, wrongPassword, error => {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.equal('Incorrect password.')
      
      done()
    })
  })

  it('Fails on  empty user id field', () => {
    expect(() => updateUserAvatar('', newAvatar, password, () => {})).to.throw(Error, 'The user id field is empty.')
  })

  it('Fails on a non-string id', () => {
    expect(() => updateUserAvatar(true, newAvatar, password, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserAvatar([], newAvatar, password, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserAvatar({}, newAvatar, password, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserAvatar(undefined, newAvatar, password, () => {})).to.throw(Error, 'The user id is not a string.')
    expect(() => updateUserAvatar(1, newAvatar, password, () => {})).to.throw(Error, 'The user id is not a string.')
  })

  it('Fails on empty new avatar field', () => {
    expect(() => updateUserAvatar('user-1', '', password, () => {})).to.throw(Error, 'The new avatar url field is empty.')
  })

  it('Fails on a non-string new avatar', () => {
    expect(() => updateUserAvatar('user-1', true, password, () => {})).to.throw(Error, 'The new avatar url is not a string.')
    expect(() => updateUserAvatar('user-1', [], password, () => {})).to.throw(Error, 'The new avatar url is not a string.')
    expect(() => updateUserAvatar('user-1', {}, password, () => {})).to.throw(Error, 'The new avatar url is not a string.')
    expect(() => updateUserAvatar('user-1', undefined, password, () => {})).to.throw(Error, 'The new avatar url is not a string.')
    expect(() => updateUserAvatar('user-1', 1, password, () => {})).to.throw(Error, 'The new avatar url is not a string.')
  })

  it('Fails on empty password field', () => {
    expect(() => updateUserAvatar('user-1', newAvatar, '', () => {})).to.throw(Error, 'The password field is empty.')
  })

  it('Fails on a non-string password', () => {
    expect(() => updateUserAvatar('user-1', newAvatar, true, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserAvatar('user-1', newAvatar, [], () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserAvatar('user-1', newAvatar, {}, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserAvatar('user-1', newAvatar, undefined, () => {})).to.throw(Error, 'The password is not a string.')
    expect(() => updateUserAvatar('user-1', newAvatar, 1, () => {})).to.throw(Error, 'The password is not a string.')
  })

  it('Fails on callBack is not a function', () => {
    expect(() => updateUserAvatar('user-1', newAvatar, password, 'Not a function.')).to.throw(Error, 'CallBack is not a function')
  })

  after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})