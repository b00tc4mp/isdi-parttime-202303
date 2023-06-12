const { expect } = require("chai")
const retrieveUser = require("./retrieveUser")
const { writeFile } = require("fs")

describe("retrieveUser", () => {
    let id, name, email, password, savedPosts

    beforeEach(done => {
        id = `id-${Math.floor(Math.random() * 101)}`
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        savedPosts = []
        writeFile("./data/users.json", "[]", "utf8", error => done(error))
    })

    it("should succed on retrieving an user", done => {
        const user = {
            id,
            name,
            email,
            password,
            savedPosts
        }
        const json = JSON.stringify([user])

        writeFile("./data/users.json", json, "utf8", error => {
            expect(error).to.be.null

            retrieveUser(user.id, (error, _user) => {
                expect(error).to.be.null
                expect(_user.name).to.equal(user.name)
                done()
            })
        })
    })

    it("should fail on retrieving an user", done => {
        const user = {
            id,
            name,
            email,
            password,
            savedPosts
        }

        retrieveUser(user.id, (error, _user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${id} not found`)
            done()
        })
    })

    it("should fail on empty user's id", () => {
        expect(() => retrieveUser("", () => {})).to.throw(Error, "id is empty")
    })

    it("should fail on non-string value in user's id", () => {
        expect(() => retrieveUser(22, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser(true, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser({}, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser([], () => { })).to.throw(Error, "id is not a string")
    })

    after(done => writeFile("./data/users.json", "[]", "utf8", error => done(error)))
})