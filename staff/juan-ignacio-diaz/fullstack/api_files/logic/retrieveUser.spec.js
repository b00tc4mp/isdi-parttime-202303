require('dotenv').config()

const { expect } = require('chai')
const { writeFile, readFile } = require('fs')

const retrieveUser = require('./retrieveUser')

const { generateUser, cleanUp, populate} = require('./helpers/tests')

describe('retrieveUser', () => {
    let userTest

    beforeEach(done => {
        userTest = generateUser().user

        cleanUp(done)
    })

    it('succeeds on existing user and correct id', done => {
        populate([userTest], [], error => {
            expect(error).to.be.null

            retrieveUser(userTest.id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.equal(userTest.avatar)

                done()
            })
        })
    })

    it('succeeds on existing user with no avatar and correct id', done => {
        userTest.avatar = null

        populate([userTest], [],  error => {
            expect(error).to.be.null

            retrieveUser(userTest.id, (error, user) => {
                expect(error).to.be.null

                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.be.null

                done()
            })
        })
    })

    it('fails on existing user and incorrect id', done => {
        populate([userTest], [], error => {
            expect(error).to.be.null

            const wrongId = userTest.id + '-wrong'

            retrieveUser(wrongId, (error, user) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${wrongId} not found`)
                expect(user).to.be.undefined

                done()
            })
        })
    })

    it('fails on empty userId', () =>
        expect(() => retrieveUser('', () => {})).to.throw(Error, 'id is empty')
    )

    it('fails on userId not exist', done => {
        const userIdNoExist = userTest.id+'NoExist'

        retrieveUser(userIdNoExist, (error, user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userIdNoExist} not found`)
            expect(user).to.be.undefined

            done()
        })
    })

    after(cleanUp)
})