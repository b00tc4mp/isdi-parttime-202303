require('dotenv').config()

const { expect } = require('chai')
const { writeFile, readFile } = require('fs')
const updateUserEmail = require('./updateUserEmail')
const { cleanUp, populate, generate } = require('./helpers/tests')

// npx mocha logic/retrievePost.spec.js

describe('updateUserEmail', () => {
    let user,

        beforeEach(done => {
            user = generate.user()

            cleanUp(done)

        })

    it('SUCCEEDS on changing email with the new one', done => {
        const users = [user]

        const newEmail = 'new-' + user.email
        const newEmailConfirm = newEmail
        const json = JSON.stringify(users)

        populate(users, [], (error) => {
            if (error) {
                done(error)

                return
            }

            updateUserEmail(id, email, newEmail, newEmailConfirm, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)
                    const user = users.find(user => user.id === id)

                    expect(user).to.exist
                    expect(user.email).to.equal(newEmail)

                    done()
                })
                // done()
            })
        })
    })

    it('FAILS on non-existing user', done => {
        newEmail = email + '-new'
        newEmailConfirm = newEmail

        updateUserEmail(id, email, newEmail, newEmailConfirm, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User ${id} not found! 👎`)

            done()
        })
    })

    it('FAILS when new email equals current email', done => {
        newEmail = user.email
        newEmailConfirm = newEmail

        updateUserEmail(id, email, newEmail, newEmailConfirm, error => {
            expect(() => updateUserEmail(id, email, newEmail, newEmailConfirm, () => { })).to.thrhow(Error, 'email must be different to current email')

            done()
        })
    })

    after(done)
})