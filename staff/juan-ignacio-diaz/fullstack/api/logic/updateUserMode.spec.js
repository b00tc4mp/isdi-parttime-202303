require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const updateUserMode = require('./updateUserMode')

const { generateUser, cleanUp, populateUser } = require('./helpers/tests')

describe('updateUserMode', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
            .then(() => populateUser(userTest))
    })

    it('succeeds on existing user and correct id', () => {
        const newMode = userTest.mode + '-new'

        return updateUserMode(userTest.id, newMode)
            .then(() => User.findById(userTest.id))
            .then(user => expect(user.mode).to.equal(newMode))
    })

    it('fails on existing user but incorrect id', () => {
        const newMode = userTest.mode + '-new'
        const userTestNoExistsId = '000000000000000000000000'

        return updateUserMode(userTestNoExistsId, newMode)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })        
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})