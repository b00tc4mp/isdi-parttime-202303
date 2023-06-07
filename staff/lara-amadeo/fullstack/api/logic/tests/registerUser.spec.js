const { expect } = require("chai")
const { readFile, writeFile } = require("fs")
const registerUser = require("../registerUser")

describe('registerUser', () => {

    beforeEach(done => {
        writeFile("./data/users.json", "[]", "utf-8", error => {
            done(error)
        })
    })

    it('should register a user succesfully', done => {
        const username = `username-${Math.floor(Math.random())}`
        const email = `${Math.floor(Math.random())}@email.com`
        const password = `password-${Math.random()}!`

        registerUser(username, email, password, error => {
            expect(error).to.be.null

            readFile("./data/users.json", "utf-8", (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.username).to.equal(username)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.likedPosts).to.have.lengthOf(0)

                done()
            })
        })
    })

    it('shoud fail on existing user', done => {
        const username = `username-${Math.floor(Math.random())}`
        const email = `${Math.floor(Math.random())}@email.com`
        const password = `password-${Math.floor(Math.random())}`

        const users = [{ username, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf-8', error => {
            expect(error).to.be.null

            registerUser(username, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with email ${email} already exists`)

                done()
            })
        })
    })

    after(done => {
        writeFile("./data/users.json", "[]", "utf-8", error => {
            done(error)
        })
    })
})