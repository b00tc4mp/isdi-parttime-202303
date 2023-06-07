require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')
const { writeFile } = require('fs')

describe('authenticateUser', () => {
    let id, email, password

    beforeEach(done => {
        id = `id-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('succeeds on existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })
        })
    })

    it('fails on non-existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on existing user but wrong passord', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            authenticateUser(email, password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(email, '', () => { })).to.throw(Error, 'password length lower than 8 characters')
    )

    // TODO add more unhappies

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})