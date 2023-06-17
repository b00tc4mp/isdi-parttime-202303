const { expect } = require('chai')
const retrieveUser = require('./retrieveUser')
const { readFile, writeFile } = require('fs')

describe('retrieveUser', () => {
    let id, name, email, password, avatar

    beforeEach(done => {
        id = `id-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@gmail.com`
        password = `password-${Math.random()}`
        image = `https://picsum.photos/200`

        writeFile('./data/users.json', '[]', error => done(error))
    })

    it('success on existing user and correct id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
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

    it('fails on non-existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            const wrongId = `${id}-wrong`

            retrieveUser(wrongId, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with id ${wrongId} not found`)

                expect(user).to.be.undefined

                done()
            })
        })
    })


    after(done => writeFile('./data/users.json', '[]', error => done(error)))

})
