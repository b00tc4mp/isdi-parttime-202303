require('dotenv').config()

const { expect } = require('chai')
const { writeFile, readFile } = require('fs')

const retrieveUser = require('./retrieveUser')

const RandomUser = require('./helpers/uiTest')

describe('retrieveUser', () => {
    let userTest

    beforeEach(done => {
        userTest = RandomUser()

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            retrieveUser(userTest.id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.equal(userTest.avatar)

                done()
            })
        })
    })

    it('succeeds on existing user with no avatar and correct id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: null }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            retrieveUser(userTest.id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.be.null

                done()
            })
        })
    })

    it('fails on existing user and incorrect id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const wrongId = userTest.id + '-wrong'

            retrieveUser(wrongId, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                expect(user).to.be.undefined

                done()
            })
        })
    })

    it('fails on empty userId', () =>
        expect(() => retrieveUser('', () => { })).to.throw(Error, 'id is empty')
    )

    it('fails on userId not exist', () => {
        const userIdNoExist = userTest.userId+'NoExit'
        expect(() => retrieveUser(userIdNoExist, () => { })).to.throw(Error, `user with id ${userIdNoExist} not found`)
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})