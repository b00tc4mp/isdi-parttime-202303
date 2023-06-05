const { expect } = require('chai')
const { writeFile } = require ('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
    const id = `user-${Math.random()}`
    const email = `e-${Math.random()}@mail.com`
    const password = `password-${Math.random()}`

    const user = [{id, email, password}]
    const json = JSON.stringify(user)

    beforeEach(done => writeFile('./data/users.json', json, 'utf8', error => done(error)))

    it('should succeed on existing user' , done => {
        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.null
            expect(userId).to.equal(id)

            done()
        })
    })

    it('should fail on unexisting user', done => {
        const wrongEmail = `e-${Math.random()}@mail.com`
        debugger

        authenticateUser(wrongEmail, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')

            done()

        })
    })

    it('should fail on wrong password', done => {
        const wrongPassword = `password-${Math.random()}`

        authenticateUser(email, wrongPassword, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('wrong password')

            done()
        })

    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})



