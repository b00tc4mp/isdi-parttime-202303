const { expect } = require('chai')
const updateEmail = require('../updateEmail')
const { writeFile } = require("fs")


describe('updateEmail', () => {

    let id, email, password
    beforeEach(done => {
        id = `id-${Math.random()}`
        email = `${Math.floor(Math.random())}@email.com`
        password = `password-${Math.floor(Math.random())}`

        writeFile('./data/users.json', '[]', 'utf-8', error => done(error))
    })


    it('should change the user email for the given one', done => {
        const newEmail = `${Math.random()}@email.com`
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            updateEmail(id, email, newEmail, error => {
                expect(error).to.be.null
                expect(email).to.not.equal(newEmail)

                done()
            })
        })
    })

    it('should fail with current and new email is the same', done => {
        const newEmail = `${Math.random()}@email.com`
        const users = [{ id, newEmail, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            updateEmail(id, newEmail, newEmail, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('New email cannot be the same as current email')

                done()
            })
        })
    })
})
