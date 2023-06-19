require('dotenv').config()
const { expect } = require("chai")
const { readFile } = require("fs")
const updateUserAvatar = require("../updateUserAvatar")
const { generate, populate, cleanUp } = require('../helpers-tests')

describe('update user avatar', () => {
    let user

    beforeEach(done => {
        user = generate.user()

        cleanUp(done)
    })

    it('succeeds on updating user avatar', done => {
        const users = [user]
        const newAvatar = `avatar-${Math.random()}`

        populate(users, [], error => {
            if (error) {
                done(error)

                return
            }

            updateUserAvatar(user.id, newAvatar, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null
    
                    const users = JSON.parse(json)
    
                    const user2 = users.find(user2 => user2.email === user.email)
    
                    expect(user2).to.exist
                    expect(user2.avatar).to.equal(newAvatar)

                    done()
                })
            })
        })
    })

    it('fails on retrieving user', done => {
        const newAvatar = `avatar-${Math.random()}`
        
        updateUserAvatar(user.id, newAvatar, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${user.id} not found`)

            done()
        })
    })

    after(cleanUp)
})