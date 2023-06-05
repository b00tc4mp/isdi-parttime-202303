const { expect } = require('chai')
const { readFile, writeFile} = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

    it('should succeed on new user', () => {
        const name = `name-${Math.random()}`
        const email = `e-${Math.random()}@gmail.com`
        const password = `password-${Math.random()}`

        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile('./data/user.json', 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.emai).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                done()
            })
        })
    })
   
    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})
