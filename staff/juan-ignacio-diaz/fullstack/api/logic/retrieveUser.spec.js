require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const retrieveUser = require('./retrieveUser')

const { generateUser, cleanUp, populateUser} = require('./helpers/tests')
debugger
describe('retrieveUser', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
        .then(() => populateUser(userTest))
    })

    it('succeeds on existing user and correct id', () => {       
        return retrieveUser(userTest.id)
            .then(user => {
                expect(user.name).to.equal(userTest.name)
                expect(user.mode).to.equal(userTest.mode)
                expect(user.avatar).to.equal(userTest.avatar)
            })
    })

    it('fails on existing user and incorrect id', () => {
        const userTestNoExistsId = '000000000000000000000000'

        return retrieveUser(userTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on empty userId', () =>
        expect(() => retrieveUser('')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})