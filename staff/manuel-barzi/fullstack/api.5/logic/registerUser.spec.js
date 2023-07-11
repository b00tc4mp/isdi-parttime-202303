require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('succeeds on new user', done => {
        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
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

                done()
            })
        })
    })

    it('succeeds on other existing user', done => {
        const idCount = Math.round(Math.random() * 100 + 1)
        const id2 = `user-${idCount}`
        const name2 = `name-${Math.random()}`
        const email2 = `e-${Math.random()}@mail.com`
        const password2 = `password-${Math.random()}`

        const users = [{ id: id2, name: name2, email: email2, password: password2 }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
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

                    done()
                })
            })
        })
    })

    it('fails on existing user', done => {
        const users = [{ name, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })

    it('fails on empty name', () => {
        // try {
        //     registerUser('', email, password, () => { })
        // } catch (error) {
        //     expect(error).to.be.instanceOf(Error)
        //     expect(error.message).to.equal('name is empty')
        // }

        expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'name is empty')
    })

    it('fails on empty email', () =>
        expect(() => registerUser(name, '', password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on non-string name', () => {
        expect(() => registerUser(undefined, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(1, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(true, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser({}, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser([], email, password, () => { })).to.throw(Error, 'name is not a string')
    })

    it('fails on non-string email', () => {
        expect(() => registerUser(name, undefined, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, 1, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, true, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, {}, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, [], password, () => { })).to.throw(Error, 'email is not a string')
    })

    // TODO add more unhappies

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})