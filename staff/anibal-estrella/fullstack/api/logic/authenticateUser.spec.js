const { expect } = require('chai')
const { readFile } = require('fs')
const authenticateUser = require('./authenticateUser')


describe('authenticateUser', () => {
    let id, email, password

    beforeEach(done => {
        // clean test start with an empty DB in an async process "done" callback
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        id = `id-${Math.random()}`
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('Succeds when user is in db', done => {


        authenticateUser(email, password, (error) => {
            expect(error).to.be.null
            readFile('./data/users.json', 'utf-8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)
                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal('string')
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                done()
            })

        })
    })






    afterEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))


})
