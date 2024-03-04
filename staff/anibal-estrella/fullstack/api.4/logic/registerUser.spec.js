require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        // in an async process I will tell the functionm the file is ready with the done() callback and pass an error if any (like an error in the file path write)
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })
    //after done start the async test

    it('SUCCEEDS when new user is registered', done => {
        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
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

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            //whiite to save in DB
            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })

    it('SUCCEEDS on other existing user', done => {
        const idCount = Math.round(Math.random() * 100 + 1)
        const id2 = `user-${idCount}`
        const name2 = `name-${Math.random()}`
        const email2 = `email-${Math.random()}@mail.com`
        const password2 = `password-${Math.random()}`

        const users = [{ id: id2, name: name2, email: email2, password: password2 }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            //whiite to save in DB
            registerUser(name, email, password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.email === email)

                    expect(user).to.exist
                    expect(user.id).to.equal(`user-${idCount + 1}`)
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
    })

    it('FAILS on empty name', () => {
        // try {
        //     registerUser('', email, password, () => { })

        // } catch (error) {
        //     expect(error).to.be.instanceOf(Error)
        //     expect(error.message).to.equal(`name is blank`)
        // }

        // we pass a callback that axcecutes inside an expect so if there's no thron error the test will fail
        expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'name is blank')
    })

    it('FAILS on non-string name', () => {
        expect(() => registerUser(undefined, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(1, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(null, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(true, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(false, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser({}, email, password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser([], email, password, () => { })).to.throw(Error, `name must be a string`)
    })


    it('FAILS on empty email', () => {
        expect(() => registerUser(name, '', password, () => { })).to.throw(Error, `email is blank`)
    })
    //it's an synchronous error we don't have to wait to load or write anything
    it('FAILS on not email', () => {
        expect(() => registerUser(name, email[0], password, () => { })).to.throw(Error, `email is not an email`)
    })

    it('FAILS on non-string email', () => {
        expect(() => registerUser(name, undefined, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, 1, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, null, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, true, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, false, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, {}, password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(name, [], password, () => { })).to.throw(Error, `email must be a string`)
    })



    // clean test start with an empty DB in an async process "done" callback
    afterEach(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))

})
// to run the test run "node logic/registerUser.js"