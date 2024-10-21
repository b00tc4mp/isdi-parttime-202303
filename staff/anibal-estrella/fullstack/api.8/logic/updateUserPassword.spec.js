require('dotenv').config()

const { expect } = require('chai')
const { writeFile, readFile } = require('fs')
const updateUserPassword = require('./updateUserPassword')
const { cleanUp, populate, generate } = require('./helpers/tests')


describe('updateUserPassword', () => {
    let id, name, email, password, avatar

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100 + 1)}`
        name = `name-${Math.random()}`
        email = `email-${Math.random()}@gmail.com`
        password = `password-${Math.random()}`
        avatar = `avatar-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
    })

    it('SUCCEEDS on changing password with the new one', done => {
        const users = [{ id, name, email, password, avatar }]
        const newPassword = password + '-new'
        const newPasswordConfirm = newPassword
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {

            expect(error).to.be.null

            updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)
                    const user = users.find(user => user.id === id)


                    expect(user).to.exist
                    expect(user.password).to.equal(newPassword)

                    done()
                })
                // done()
            })
        })
    })

    it('FAILS on non-existing user', done => {
        newPassword = password + '-new'
        newPasswordConfirm = newPassword

        updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User ${id} not found! 👎`)

            done()
        })
    })

    it('FAILS when new password equals current password', done => {
        newPassword = password
        newPasswordConfirm = newPassword

        updateUserPassword(id, password, newPassword, newPasswordConfirm, error => {
            expect(() => updateUserPassword(id, password, newPassword, newPasswordConfirm, () => { })).to.thrhow(Error, 'password must be different to current password')

            done()
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})