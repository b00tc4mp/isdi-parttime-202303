const { expect } = require('chai')
const { writeFile, readFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')


describe('updateUserAvatar', () => {
    let id, name, email, password

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100 + 1)}`
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar = `avatar-${Math.random()}`

        writeFile('./data/users.json', '[]', error => done(error))
    })

    it('SUCCEEDS on existing user and corrrect id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            const newAvatar = avatar + "-new"

            // it gives should responde with a NULL or ERROR
            updateUserAvatar(id, newAvatar, error => {
                expect(error).to.be.null
                // test what has been saved to the json
                readFile('./data/users.json', 'utf8', (error, json) => {
                    expect(error).to.be.null
                    // grab the avatar from the user
                    const [{ avatar }] = JSON.parse(json)
                    //check if avatar changed
                    expect(avatar).to.equal(newAvatar)
                })
                done()
            })
        })
    })

    it('FAILS on existing user but corrrect id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            const newAvatar = avatar + "-new"
            const wrongId = id + '-wrong'
            //we send a wrong userId
            updateUserAvatar(wrongId, newAvatar, error => {
                expect(error).to.be.instanceOf(Error)
                // test if avatar has been saved to the json
                expect(error.message).to.equal(`User with id ${wrongId} not found! 👎`)

                done()
            })
        })
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})