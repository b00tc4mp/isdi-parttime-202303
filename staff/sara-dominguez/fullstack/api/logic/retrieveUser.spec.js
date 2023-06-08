const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
    let id, name, email, password, avatar

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100)}`,
            name = `name-${Math.round(Math.random() * 100)}`,
            email = `e-${Math.round(Math.random() * 100)}@mail.com`,
            password = `password-${Math.round(Math.random() * 100)}`,
            avatar = `avatar-${Math.random()}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            retrieveUser(id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.avatar).to.equal(avatar)

                done()
            })
        })
    })
    it('fails on non-existing user and correct id', done => {
        retrieveUser(id, (error, user) => {
            expect(error).to.be.instanceof(Error)
            expect(error.message).to.equal(`user with id ${id} not found`)

            done()
        })
    })

    //TODO : succeeds on existing user with no avatar and correct id, fails on existin user and incorrect id
    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})
