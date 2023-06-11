require('dotenv').config()

const { expect } = require('chai')
const updateUserPassword = require('./updateUserPassword')
const { writeFile, readFile } = require('fs')

const RandomUser = require('./helpers/ui_userTest')

describe('updateUserPassword', () => {
    let userTest

    beforeEach(done => {
        userTest = RandomUser()

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
    })

    it('succeeds on existing user and correct id', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const newPassword = userTest.password + '-new'

            updateUserPassword(userTest.id, userTest.password, newPassword, newPassword, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.id === userTest.id)

                    expect(user).to.be.exist
                    expect(user.password).to.equal(newPassword)

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
            const newPassword = userTest.password + '-new'

            updateUserPassword(wrongId, userTest.password, newPassword, newPassword, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)

                done()
            })
        })
    })

    it('fails on existing user but invalid password', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password, avatar: userTest.avatar }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const invalidPassword = userTest.password + '-invalid'
            const newPassword = userTest.password + '-new'

            updateUserPassword(userTest.id, invalidPassword, newPassword, newPassword, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`Error the pasword is invalid`)

                done()
            })
        })
    })

    it('fails on existing user but incorrect password', () => {
        const wrongPassword = 'sort'
        const newPassword = userTest.password + '-new'

        expect(()  => 
            updateUserPassword(userTest.id, wrongPassword, newPassword, newPassword, () => {

            }).to.equal(`the pasword is invalid`)
        )

        expect(()  => 
            updateUserPassword(userTest.id, '', newPassword, newPassword, () => {

            }).to.equal(`the pasword is invalid`)
         )
    })

    it('fails on existing user but incorrect new password', () => {
        const wrongNewPassword = 'sort'
        const newPassword = userTest.password + '-new'

        expect(()  => 
            updateUserPassword(userTest.id, userTest.password, wrongNewPassword, newPassword, () => {

            }).to.equal(`the newpasword is invalid`)
        )

        expect(()  => 
            updateUserPassword(userTest.id, userTest.password, '', newPassword, () => {

            }).to.equal(`the newpasword is invalid`)
         )
    })

    // TODO add more unhappies

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))
})