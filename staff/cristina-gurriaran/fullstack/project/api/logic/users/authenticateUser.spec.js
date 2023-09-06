const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const { authenticateUser } = require('../logic')
const { cleanUp, generateUser } = require('../helpers/tests')

const { User } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../../com')

describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on existing user', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            authenticateUser(user.email, user.password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(user.id)

                done()
            })
        })
    })

    it('fails on non-existing user', done =>
        authenticateUser(user.email, user.password, (error, userId) => {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`user with email ${user.email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    )

    it('fails on existing user but wrong passord', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            authenticateUser(user.email, user.password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    it('fails on existing user but wrong email', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            user.email += '-wrong'

            authenticateUser(user.email, user.password, (error, userId) => {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal(`user with email ${user.email} not found`)
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', user.password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(user.email, '', () => { })).to.throw(Error, 'password length lower than 8 characters')
    )

    it('fails on non-callback', () =>
        expect(() => authenticateUser(user.email, user.password)).to.throw(Error, 'callback is not a function')
    )

    // TODO add more unhappiesx

    after(cleanUp)
})