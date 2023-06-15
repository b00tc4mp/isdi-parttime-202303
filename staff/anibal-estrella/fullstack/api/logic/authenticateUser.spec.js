require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')
const { cleanUp, populate, generate } = require('./helpers/tests')


describe('authenticateUser', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('SUCCEEDS when user is in db', done => {
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

    it('FAILS on non-exixting user', done =>
        authenticateUser(user.email, user.password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with email ${user.email} not found! 👎`)
            expect(userId).to.be.undefined

            done()
        })
    )

    it('FAILS when user is in db but wrong password', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            authenticateUser(user.email, user.password + '-wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Wrong password 😢')
                expect(userId).to.be.undefined

                done()
            })

        })

    })


    it('FAILS when user is in db but wrong email', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            user.email += '-wrong'

            authenticateUser(user.email, user.password, (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with email ${user.email} not found! 👎`)
                expect(userId).to.be.undefined

                done()
            })

        })

    })

    it('FAILS on non-string password', () => {
        expect(() => authenticateUser(user.email, undefined, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, 1, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, null, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, true, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, false, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, {}, () => { })).to.throw(Error, `password must be a string`)
        expect(() => authenticateUser(user.email, [], () => { })).to.throw(Error, `password must be a string`)
    })

    it('FAILS on empty email', () => {
        expect(() => authenticateUser('', user.password, () => { })).to.throw(Error, `email is blank`)
    })

    it('FAILS on empty password', () => {
        expect(() => authenticateUser(user.email, '', () => { })).to.throw(Error, 'password must be more than 8 characters long')
    })


    it('FAILS on non callback', () => {
        expect(() => authenticateUser(user.email, user.password)).to.throw(Error, 'callback must be a function')
    })

    after(cleanUp)
})
