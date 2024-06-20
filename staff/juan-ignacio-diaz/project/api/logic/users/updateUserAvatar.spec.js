require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../../data/models')

const updateUserAvatar = require('./updateUserAvatar')

const { generateUser, cleanUp, populateUser } = require('../helpers/tests')

describe('updateUserAvatar', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()

        await cleanUp()
        return await populateUser(userTest)
    })

    it('succeeds on existing user and correct id', async () => {
        const newAvatar = userTest.avatar + '-new'

        await updateUserAvatar(userTest.id, newAvatar)
        const user = await User.findById(userTest.id)
        return expect(user.avatar).to.equal(newAvatar)
    })

    it('fails on existing user but incorrect id', async () => {
        const newAvatar = userTest.avatar + '-new'
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await updateUserAvatar(userTestNoExistsId, newAvatar)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})