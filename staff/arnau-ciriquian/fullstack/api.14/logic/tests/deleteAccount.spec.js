require('dotenv').config()
const { expect } = require("chai")
const { readFile } = require("fs")
const deleteAccount = require("../deleteAccount")
const { generate, populate, cleanUp } = require('../helpers-tests')

describe('delete user', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on deleting user', done => {
        const users = [user]

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            deleteAccount(user.id, error => {
                expect(error).to.be.null
                
                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user2 = users.find(user2 => user2.email === user.email)

                    expect(user2).to.be.undefined

                    done()
                })
            })
        })
    })

    it('fails on retrieving user to delete', done => {
        deleteAccount(user.id, (error, _user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${user.id} not found`)
            expect(_user).to.be.undefined

            done()
        })
    })

    after(cleanUp)
})