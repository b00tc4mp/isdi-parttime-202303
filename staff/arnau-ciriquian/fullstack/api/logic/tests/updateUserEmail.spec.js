require('dotenv').config()
const { expect } = require("chai")
const { readFile } = require("fs")
const updateUserEmail = require("../updateUserEmail")
const { generate, populate, cleanUp } = require('../helpers-tests')

describe('update user email', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on updating user email', done => {
        const users = [user]
        const newEmail = `newemail-${Math.random()}@test.com`
        const newEmailConfirmation = newEmail

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(user.id, user.email, newEmail, newEmailConfirmation, user.password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null
    
                    const users = JSON.parse(json)
    
                    const user2 = users.find(user2 => user2.id === user.id)
    
                    expect(user2).to.exist
                    expect(user2.email).to.equal(newEmail)

                    done()
                })
            })
        })
    })

    it('fails on retrieving user', done => {
        const users = [user]
        const newEmail = `newemail-${Math.random()}@test.com`
        const newEmailConfirmation = newEmail
        const wrongId = `user-${Math.random()}`

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(wrongId, user.email, newEmail, newEmailConfirmation, user.password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                done()
            })
        })
    })

    it('fails on user email equal to old email', done => {
        const users = [user]
        const newEmail = `newemail-${Math.random()}@test.com`
        const newEmailConfirmation = newEmail
        const worngEmail = `wrongemail-${Math.random()}@test.com`

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(user.id, worngEmail, newEmail, newEmailConfirmation, user.password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`email does not correspond to actual email`)

                done()
            })
        })
    })

    it('fails on wrong user password', done => {
        const users = [user]
        const newEmail = `newemail-${Math.random()}@test.com`
        const newEmailConfirmation = newEmail
        const wrongPassword = `wrongPassword-${Math.random()}`

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(user.id, user.email, newEmail, newEmailConfirmation, wrongPassword, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`incorrect password`)

                done()
            })
        })
    })

    it('fails on new email already registered', done => {
        const users = [user]
        const newEmail = user.email
        const newEmailConfirmation = newEmail

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(user.id, user.email, newEmail, newEmailConfirmation, user.password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('new email already registered')

                done()
            })
        })
    })
})