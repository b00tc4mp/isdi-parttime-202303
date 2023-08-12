require('dotenv').config()
const { expect } = require('chai')
const { writeFile, readFile } = require ('fs')
const retrieveUser = require('./retrieveUser.js')


describe('retrieveUser', () => {
    let id, name, email, password, avatar, favs

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
        
        id = `user-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar =  null
        favs = null

    })

    it('succeeds on retrieving user', done => {
        const users = [{ id: id, name: name, email: email, password: password, avatar: avatar, favs: favs}]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            retrieveUser(id, (error, user) => {
                expect(error).to.be.null
                
                expect(user.name).to.equal(name)
                expect(user.avatar).to.be.null
                expect(user.avatar).to.be.null

                done()                
            })
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))

})