require('dotenv').config()
const { expect } = require("chai")
const authenticateUser = require("../authenticateUser")
const { generate, populate, cleanUp } = require('../helpers-tests')

describe('authenticate user', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on authenticating user', done => {
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

    it('fails on missing user', done => {
        authenticateUser(user.email, user.password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${user.email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on wrong password', done => {
        const wrongPassword = `${user.password}1`

        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            authenticateUser(user.email, wrongPassword, (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`wrong password`)
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    after(cleanUp)
})