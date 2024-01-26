require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
    let id, name, email, password, avatar

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100)}`,
            name = `name-${Math.round(Math.random() * 100)}`,
            email = `e-${Math.round(Math.random() * 100)}@mail.com`,
            password = `password-${Math.round(Math.random() * 100)}`,
            avatar = `avatar-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const newAvatar = avatar + '-new'

            updateUserAvatar(id, newAvatar, (error) => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null

                    // const user= JSON.parse(json) --> solo hay un usuario por tanto se puede seguir destructurando

                    // const [user] = JSON.parse(json) --> 

                    const [{ avatar }] = JSON.parse(json)

                    expect(avatar).to.equal(newAvatar)

                    done()
                })

            })
        })
    })

    it('fails on existing user but incorrect id', done => {
        const users = [{ id, name, email, password, avatar }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const wrongId = id + '-wrong'
            const newAvatar = avatar + '-new'

            updateUserAvatar(id + '-wrong', newAvatar, (error) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                done()
            })
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})