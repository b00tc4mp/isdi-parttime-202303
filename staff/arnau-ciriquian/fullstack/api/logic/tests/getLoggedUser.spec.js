require('dotenv').config()
const { expect } = require("chai")
const getLoggedUser = require("../getLoggedUser")
const { generate, populate, cleanUp } = require('../helpers-tests')

describe('get logged user', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on retrieving logged user', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            getLoggedUser(user.id, (error, _user) => {
                expect(error).to.be.null
                expect(_user.name).to.equal(user.name)
                expect(_user.avatar).to.be.undefined

                done()
            })
        })
    })

    it('succeeds on retrieving logged user with avatar', done => {
        user.avatar = `avatar-${Math.random()}`

        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            getLoggedUser(user.id, (error, _user) => {
                expect(error).to.be.null
                expect(_user.name).to.equal(user.name)
                expect(_user.avatar).to.equal(user.avatar)

                done()
            })
        })
    })

    it('fails on retrieving logged user', done => {
        getLoggedUser(user.id, (error, _user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${user.id} not found`)
            expect(_user).to.be.undefined

            done()
        })
    })

    after(cleanUp)
})