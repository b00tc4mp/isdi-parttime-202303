const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')
const { readFile, writeFile } = require('fs')

describe('authenticateUser', () => {
    let name, email, password

    beforeEach(done => {
        id = `id-${Math.random()}`
        email = `e-${Math.random()}@gmail.com`
        password = `password-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('should authenticate a user in database', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(id).to.equal(userId)

                done()
            })
        })
    })

    it('fails on non-existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })
    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})
