require('dotenv').config()

const { expect } = require('chai')
const updateUserMode = require('./updateUserMode')
const { writeFile, readFile } = require('fs')

const RandomUser = require('./helpers/ui_userTest')

describe('updateUserMode', () => {
    let userTest

    beforeEach(done => {
        userTest = RandomUser()

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar, mode: userTest.mode }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const newMode = userTest.mode + '-new'

            updateUserMode(userTest.id, newMode, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const [{ mode }] = JSON.parse(json)

                    expect(mode).to.equal(newMode)

                    done()
                })
            })
        })
    })

    it('fails on existing user but incorrect id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const wrongId = userTest.id + '-wrong'
            const newMode = userTest.mode + '-new'

            updateUserMode(wrongId, newMode, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                done()
            })
        })
    })


    // TODO add more unhappies

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error)))
})