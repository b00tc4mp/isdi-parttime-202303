require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')
const registerUser = require('./registerUser')
const { cleanUp, populate, generate } = require('./helpers/tests')
CONST { MONGO }

describe('registerUser', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })


    it('SUCCEEDS when new user is registered', done => {
        registerUser(user.name, user.email, user.password, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user2 = users.find(user2 => user2.email === user.email)

                expect(user2).to.exist
                expect(user2.id).to.be.a('string')
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)

                done()
            })

        })

    })

    it('FAILS existing user', done => {
        const users = [user]
        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            registerUser(user.name, user.email, user.password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${user.email} already exists`)

                done()
            })
        })
    })

    it('SUCCEEDS on other existing user', done => {
        const idCount = Math.round(Math.random() * 100 + 1)
        const id2 = `user-${idCount}`
        const user2 = generate.user()
        user2.id = id2
        const users = [user2]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            registerUser(user.name, user.email, user.password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user3 = users.find(user3 => user3.email === user.email)

                    expect(user3).to.exist
                    expect(user3.id).to.equal(`user-${idCount + 1}`)
                    expect(user3.name).to.equal(user.name)
                    expect(user3.email).to.equal(user.email)
                    expect(user3.password).to.equal(user.password)
                    expect(user3.avatar).to.be.null
                    expect(user3.favs).to.have.lengthOf(0)


                    done()
                })
            })
        })
    })

    it('FAILS on empty name', () => {

        expect(() => registerUser('', user.email, user.password, () => { })).to.throw(Error, 'name is blank')
    })



    it('FAILS on empty email', () => {
        expect(() => registerUser(user.name, '', user.password, () => { })).to.throw(Error, `email is blank`)
    })

    it('FAILS on not an email', () => {
        expect(() => registerUser(user.name, user.email[0], user.password, () => { })).to.throw(Error, `email is not an email`)
    })

    it('FAILS on non-string name', () => {
        expect(() => registerUser(undefined, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(1, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(null, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(true, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(false, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser({}, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser([], user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
    })

    it('FAILS on non-string email', () => {
        expect(() => registerUser(user.name, undefined, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, 1, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, null, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, true, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, false, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, {}, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, [], user.password, () => { })).to.throw(Error, `email must be a string`)
    })
    after(cleanUp)
})
