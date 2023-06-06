const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')


describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })
    //after done start test

    it('succeeds when new user is registered', done => {
        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf-8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                // test finnishes
                done()
            })

        })

    })

    it('FAILS existing user', done => {
        const users = [{ name, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf-8', error => {
            expect(error).to.be.null

            //whiite to save in DB
            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })

    it('FAILS on empty name', () => {
        // try {
        //     registerUser('', email, password, () => { })

        // } catch (error) {
        //     expect(error).to.be.instanceOf(Error)
        //     expect(error.message).to.equal(`name is blank`)
        // }

        // we pass a callback that esecuters inside an expect so if there's no thron error the test will fail
        expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'name must be longer than one character')

    })




    // clean test start with an empty DB in an async process "done" callback
    afterEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})
// to run the test run "node logic/registerUser.js"