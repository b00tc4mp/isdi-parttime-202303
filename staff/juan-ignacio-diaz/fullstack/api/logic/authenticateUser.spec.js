require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')

const authenticateUser = require('./authenticateUser')

const RandomUser = require('./helpers/uiTest')

describe('authenticateUser', () => {
    let userTest

    beforeEach(done => {
        userTest = RandomUser()

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user', done => {
        const users = [{ id: userTest.id, email: userTest.email, password: userTest.password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            authenticateUser(userTest.email, userTest.password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(userTest.id)

                done()
            })
        })
    })

    it('fails on non-existing user', done => {
        const users = [{ id: userTest.id, email: userTest.email, password: userTest.password }]
        const json = JSON.stringify(users)

        authenticateUser(userTest.email, userTest.password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${userTest.email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on existing user but wrong passord', done => {
        const users = [{ id: userTest.id, email: userTest.email, password: userTest.password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            authenticateUser(userTest.email, userTest.password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', userTest.password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on wrong email', () =>
        expect(() => authenticateUser('aaa', userTest.password, () => { })).to.throw(Error, 'the email is wrong')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(userTest.email, '', () => { })).to.throw(Error, 'password length lower than 8 characters')
    )

    it('fails on type password', () =>
        expect(() => authenticateUser(userTest.email, 123, () => { })).to.throw(Error, 'password is not a string')
    )

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})