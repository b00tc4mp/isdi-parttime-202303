require('dotenv').config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User } = require('../../data/models')
const updateUserAvatar = require('./updateUserAvatar')

describe('updateUserAvatar', () => {
    before(async () => {
        await mongoose.connect(
            `${process.env.MONGODB_URL}${process.env.DATABASE_TEST}`
        )
    })

    let user

    beforeEach(async () => {
        user = generateUser()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should succeed on update user avatar', async () => {
        user = generateUser()
        await User.create(user)

        const registeredUser = await User.findOne({ email: user.email })

        await updateUserAvatar(registeredUser.id, 'avatar-updated')

        const retrievedUser = await User.findById(registeredUser.id)

        expect(retrievedUser.avatar).to.equal('avatar-updated')
    })

    it('should fail on non-existing user', async () => {
        user = generateUser()
        const userId = '123456789012345678901234'
        try {
            await updateUserAvatar(userId, user.avatar)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('should fail on empty avatar url', () => {
        user = generateUser()
        const userId = 'user-id'

        expect(() => updateUserAvatar(userId, '', () => { })).to.throw(ContentError, 'url is empty')
    })

    it('should fail on non-string avatar url', () => {
        const userId = 'user-id'

        expect(() => updateUserAvatar(userId, undefined, () => { })).to.throw(TypeError, 'url is not a string')
        expect(() => updateUserAvatar(userId, 1, () => { })).to.throw(TypeError, 'url is not a string')
        expect(() => updateUserAvatar(userId, true, () => { })).to.throw(TypeError, 'url is not a string')
        expect(() => updateUserAvatar(userId, {}, () => { })).to.throw(TypeError, 'url is not a string')
        expect(() => updateUserAvatar(userId, [], () => { })).to.throw(TypeError, 'url is not a string')
    })
})

