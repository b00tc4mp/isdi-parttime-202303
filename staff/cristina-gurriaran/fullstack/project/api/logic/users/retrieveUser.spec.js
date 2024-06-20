require('dotenv').config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { ExistenceError } } = require('com')
const { User } = require('../../data/models')
const { ObjectId } = require('mongodb')
const retrieveUser = require('./retrieveUser')

describe('retrieveUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generateUser()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should succeed on retrieving an user by id', async () => {
        user = generateUser()
        await User.create(user)

        const RegisteredUser = await User.findOne({ email: user.email })

        const retrievedUser = await retrieveUser(RegisteredUser._id)

        expect(retrievedUser).to.exist
        expect(retrievedUser.name).to.equal(RegisteredUser.name)

    })

    it('should fail on a non-existent user', async () => {
        const userId = new ObjectId('123456789012345678901234')

        try {
            await retrieveUser(userId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })
})