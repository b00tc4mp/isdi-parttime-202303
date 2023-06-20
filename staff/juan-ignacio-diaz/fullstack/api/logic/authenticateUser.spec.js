require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')

const authenticateUser = require('./authenticateUser')

const { generateUser, cleanUp, populate } = require('./helpers/tests')

describe('authenticateUser', () => {
    let userTest

    beforeEach(done => {
        userTest = generateUser().user

        cleanUp(done)
    })

    it('succeeds on existing user', done => {
        populate([userTest], [], error => {
            expect(error).to.be.null

            authenticateUser(userTest.email, userTest.password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(userTest.id)

                done()
            })
        })
    })

    it('fails on non-existing user', done => {
        authenticateUser(userTest.email, userTest.password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${userTest.email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on existing user but wrong passord', done => {
        populate([userTest], [], error => {
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

    after(cleanUp)
})