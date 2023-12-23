require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')

const authenticateUser = require('./authenticateUser')

const { generateUser, cleanUp, populateUser } = require('./helpers/tests')

describe('authenticateUser', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
    })

    it('succeeds on existing user', () => {
        return populateUser(userTest)
            .then(() => authenticateUser(userTest.email, userTest.password))
            .then(userId => expect(userId).to.equal(userTest.id))
            .catch(error => expect(error).to.be.null)
    })

    it('fails on non-existing user', () => {
        return authenticateUser(userTest.email, userTest.password)
            .then(userId => expect(userId).to.be.undefined)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user not found`)
            })
    })

    it('fails on existing user but wrong passord', () => {
        return populateUser(userTest)
            .then(() => authenticateUser(userTest.email, userTest.password + '-wrong'))
            .then(userId => expect(userId).to.be.undefined)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
            })
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', userTest.password)).to.throw(Error, 'email is empty')
    )

    it('fails on wrong email', () =>
        expect(() => authenticateUser('aaa', userTest.password)).to.throw(Error, 'the email is wrong')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(userTest.email, '')).to.throw(Error, 'password length lower than 8 characters')
    )

    it('fails on type password', () =>
        expect(() => authenticateUser(userTest.email, 123)).to.throw(Error, 'password is not a string')
    )

    after(() => cleanUp()
        .then(() => mongoose.disconnect())
    )
})
