require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../../data/models')

const updateUserMode = require('./updateUserMode')

const { generateUser, cleanUp, populateUser } = require('../helpers/tests')

describe('updateUserMode', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()

        await cleanUp()
        return await populateUser(userTest)
    })

    it('succeeds on existing user and correct id', async () => {
        const newMode = userTest.mode + '-new'

        await updateUserMode(userTest.id, newMode)
        const user = await User.findById(userTest.id)
        return expect(user.mode).to.equal(newMode)
    })

    it('fails on existing user but incorrect id', async () => {
        const newMode = userTest.mode + '-new'
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await updateUserMode(userTestNoExistsId, newMode)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }        
    })

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})