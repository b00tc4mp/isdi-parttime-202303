require('dotenv').config()
const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveUser = require('./retrieveUser')


describe('retrieveUser', () => {
    let id, name, email, password

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100 + 1)}`
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar = `avatar-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', error => done(error))
    })

    it('SUCCEEDS on existing user and corrrect id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
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

    it('SUCCEEDS on existing user with no avatar and correct id', done => {
        const users = [{ id, name, email, password, avatar: null }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            retrieveUser(id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.avatar).to.be.null

                done()
            })

        })
    })

    it('FAILS on existing user and correct id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const wrongId = id + '-wrong'
            retrieveUser(wrongId, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with id ${wrongId} not found! 👎`)

                expect(user).to.be.undefined

                done()
            })
        })
    })

    afterEach(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})