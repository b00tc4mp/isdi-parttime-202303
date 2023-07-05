require('dotenv').config()

const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const context = require('./context')

const authenticateUser = require('./authenticateUser')

const { generateUser, cleanUp, populate } = require('./helpers/tests')

describe('authenticateUser', () => {
    let client

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                context.users = db.collection('users')
                context.posts = db.collection('posts')
            })
    })

    let userTest

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
    })

    it('succeeds on existing user', () => {
        return populate([userTest], [])
            .then(() => authenticateUser(userTest.email, userTest.password))
            .then(userId => expect(userId).to.equal(userTest._id.toString()))
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
        return populate([userTest], [])
            .then(() => authenticateUser(userTest.email, userTest.password + '-wrong'))
            .then(userId => expect(userId).to.be.undefined)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
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

    after(() => cleanUp().then(() => client.close()))
})