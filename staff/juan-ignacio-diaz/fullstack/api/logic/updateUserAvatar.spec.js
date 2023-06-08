require('dotenv').config()

const { expect } = require('chai')
const updateUserAvatar = require('./updateUserAvatar')
const { writeFile, readFile } = require('fs')

const RandomUser = require('./helpers/uiTest')

describe('updateUserAvatar', () => {
    let wrongId
    beforeEach(done => {
        userTest = RandomUser()

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const newAvatar = userTest.avatar + '-new'

            updateUserAvatar(userTest.id, newAvatar, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const [{ avatar }] = JSON.parse(json)

                    expect(avatar).to.equal(newAvatar)

                    done()
                })
            })
        })
    })

    it('fails on existing user but incorrect id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, error => {
            expect(error).to.be.null

            const wrongId = userTest.id + '-wrong'
            const newAvatar = userTest.avatar + '-new'

            updateUserAvatar(wrongId, newAvatar, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                done()
            })
        })
    })


    // TODO add more unhappies

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})