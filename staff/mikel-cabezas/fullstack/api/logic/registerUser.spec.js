const { expect } = require('chai')
const registerUser = require('./registerUser.js');
const { readFile, writeFile, write } = require('fs');
const { error } = require('console');


describe('registerUser', () => {
    let name, email, password

    beforeEach(done => {
        debugger

        name = `name-${Math.random()}`
        email = `e-${Math.random()}@gmail.com`
        password = `password-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })
    it('should succeed on register user', done => {
        debugger
        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)
                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.favPosts).to.have.lengthOf(0)

                done()
            })
        })
    })
    it('should fail on existing user', done => {
        const name = `name-${Math.random()}`
        const email = `e-${Math.random()}@gmail.com`
        const password = `password-${Math.random()}`

        const user = [{ name, email, password }]

        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null
            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exists`)

                done()
            })
        })
    })
    it('files on empty name', () => {
        try {
            registerUser('', email, password, () => { })
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`Name is empty`)
        }
    })
    it('files on empty email', () => {
        expect(() => registerUser(name, '', password, () => { })).to.Throw(Error, `Email is empty`)
    })
    it('files on empty password', () => {
        expect(() => registerUser(name, email, '', () => { })).to.Throw(Error, `Password is empty`)
    })
    it('files on non-string name', () => {
        expect(() => registerUser(undefined, email, password, () => { })).to.Throw(Error, `Name is not a string`)
        expect(() => registerUser(1, email, password, () => { })).to.Throw(Error, `Name is not a string`)
        expect(() => registerUser(true, email, password, () => { })).to.Throw(Error, `Name is not a string`)
        expect(() => registerUser({}, email, password, () => { })).to.Throw(Error, `Name is not a string`)
        expect(() => registerUser([], email, password, () => { })).to.Throw(Error, `Name is not a string`)
    })
    it('files on non-string email', () => {
        expect(() => registerUser(name, undefined, password, () => { })).to.Throw(Error, `Email is not a string`)
        expect(() => registerUser(name, 1, password, () => { })).to.Throw(Error, `Email is not a string`)
        expect(() => registerUser(name, true, password, () => { })).to.Throw(Error, `Email is not a string`)
        expect(() => registerUser(name, {}, password, () => { })).to.Throw(Error, `Email is not a string`)
        expect(() => registerUser(name, [], password, () => { })).to.Throw(Error, `Email is not a string`)
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})