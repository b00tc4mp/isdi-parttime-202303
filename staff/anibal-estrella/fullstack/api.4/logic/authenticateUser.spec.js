require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('./authenticateUser')


describe('authenticateUser', () => {
    let id, name, email, password

    beforeEach(done => {
        id = `id-${Math.random()}`
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('SUCCEEDS when user is in db', done => {

        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })

        })

    })

    it('FAILS when user is in db but wrong password', done => {

        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            authenticateUser(email, password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Wrong password 😢')
                expect(userId).to.be.undefined

                done()
            })

        })

    })

    it('FAILS on non-exixting user', done => {

        const users = [{ id, email, password }]
        const json = JSON.stringify(users)
        //we dont write the user on the DB so user is missing

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with email ${email} not found! 👎`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('FAILS on empty email', () => {
        expect(() => authenticateUser('', password, () => { })).to.throw(Error, `email is blank`)
    })

    it('FAILS on empty password', () => {
        expect(() => authenticateUser(email, '', () => { })).to.throw(Error, 'password must be more than 8 characters long')
    })

    it('FAILS on non-string password', () => {
        expect(() => authenticateUser(email, undefined, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, 1, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, null, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, true, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, false, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, {}, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(email, [], () => { })).to.throw(Error, `password must be a string`)
    })

    afterEach(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})
