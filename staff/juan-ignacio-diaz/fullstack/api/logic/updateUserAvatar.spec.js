require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const updateUserAvatar = require('./updateUserAvatar')

const { generateUser, cleanUp, populateUser } = require('./helpers/tests')

describe('updateUserAvatar', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
            .then(() => populateUser(userTest))
    })

    it('succeeds on existing user and correct id', () => {
        const newAvatar = userTest.avatar + '-new'

        return updateUserAvatar(userTest.id, newAvatar)
            .then(() => User.findById(userTest.id))
            .then(user => expect(user.avatar).to.equal(newAvatar))
    })

    it('fails on existing user but incorrect id', () => {
        const newAvatar = userTest.avatar + '-new'
        const userTestNoExistsId = '000000000000000000000000'

        return updateUserAvatar(userTestNoExistsId, newAvatar)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})