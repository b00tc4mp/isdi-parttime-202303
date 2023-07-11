require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('../authenticateUser')

describe('authenticateUser', () => {

    let id, email, password
    beforeEach(done => {
        id = `id-${Math.random()}`
        email = `email-${Math.random()}`
        password = `password-${Math.random()}`

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf-8', error => done(error))
    })

    it('should log in the user succesfully', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null
            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })
        })

    })


    it('should fail on wrong email', done => {
        authenticateUser(email + 'wrong', password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with email ${email + 'wrong'} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('should fail on wrong password', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf-8', error => {
            expect(error).to.be.null

            authenticateUser(email, password + 'wrong', (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`Email or password incorrect`)
                expect(userId).to.be.undefined

                done()
            })
        })
    })

    it('should fail on non-existing user', done => {
        authenticateUser(email, password + 'wrong', (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with email ${email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    after(done => {
        writeFile("./data/users.json", "[]", "utf-8", error => {
            done(error)
        })
    })
})

