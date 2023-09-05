require('dotenv').config()

const { expect } = require('chai')
const updatePassword = require('../updatePassword')
const { writeFile, readFile } = require("fs")

describe('updatePassword', () => {

    let id, email, password
    beforeEach(done => {
        id = `id-${Math.random()}`
        email = `${Math.floor(Math.random())}@email.com`
        password = `password-${Math.floor(Math.random())}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', error => done(error))
    })

    it('should change the user password for the given one', done => {
        const newPassword = `password-${Math.random()}`
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            updatePassword(id, password, newPassword, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user )
                })
                expect(password).to.not.equal(newPassword)

                done()
            })
        })
    })

    it('should fail with non-existing user', done => {
        const newPassword = `password-${Math.random()}`

        updatePassword(id, password, newPassword, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with id ${id} not found`)

            done()
        })
    })


    it('should fail if current password is incorrect', done => {
        const newPassword = `password-${Math.random()}`
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            updatePassword(id, password + '-wrong', newPassword, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('Invalid current password')

                done()
            })
        })
    })

    it('should fail if new password is the same as current password', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            updatePassword(id, password, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('New password cannot be the same as current password')

                done()
            })
        })
    })


})