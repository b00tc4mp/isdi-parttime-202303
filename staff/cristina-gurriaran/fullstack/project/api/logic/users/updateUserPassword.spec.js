require('dotenv').config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { ExistenceError, ContentError, AuthError } } = require('com')
const { User } = require('../../data/models')
const updateUserPassword = require('./updateUserPassword')

describe('updateUserPassword', () => {
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

    it('should succeed on update user password', async () => {
        user = generateUser()
        await User.create(user)
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'

        const registeredUser = await User.findOne({ email: user.email })

        await updateUserPassword(registeredUser.id, registeredUser.password, newPassword, newPasswordConfirm)

        const retrievedUser = await User.findById(registeredUser.id)

        expect(retrievedUser.password).to.equal(newPassword)

    })

    it('should fail on matching current and new password ', async () => {
        user = generateUser()
        await User.create(user)
        const registeredUser = await User.findOne({ email: user.email })

        const newPassword = registeredUser.password
        const newPasswordConfirm = 'new-password-confirm'

        try {
            await updateUserPassword(registeredUser.id, registeredUser.password, newPassword, newPasswordConfirm)

        } catch (error) {

            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new password equals old password')
        }
    })

    it('should fail on non-matching passwords', async () => {
        user = generateUser()
        await User.create(user)
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password-confirm'

        const registeredUser = await User.findOne({ email: user.email })

        try {
            await updateUserPassword(registeredUser.id, newPassword, newPasswordConfirm)

        } catch(error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('password confirmation mismatch')

        }
    })

    it('should fail on non-existing user', async () => {
        const userId = '123456789012345678901234'
        const password = 'current-password'
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'
        try {
            await updateUserPassword(userId, password, newPassword, newPasswordConfirm)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('should fail on wrong current password', async () => {
        user = generateUser()
        await User.create(user)
        const registeredUser = await User.findOne({ email: user.email })
        const password = 'wrong-password'
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'

        try {
            await updateUserPassword(registeredUser.id, password, newPassword, newPasswordConfirm)

        } catch (error) {

            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('wrong password')
        }
    })
 
    it('should fail on empty password', () => {
        const userId = '123456789012345678901234'
        const password = ''
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, password, newPassword, newPasswordConfirm, () => { })).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on password shorter than 8 characters', () => {
        const userId = '123456789012345678901234'
        const password = '123'
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, password, newPassword, newPasswordConfirm, () => { })).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on non-string password', () => {
        const userId = '123456789012345678901234'
        const newPassword = 'new-password'
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, undefined, newPassword, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, 1, newPassword, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, true, newPassword, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, [], newPassword, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, {}, newPassword, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
    })

    it('should fail on empty new password', () => {
        const userId = '123456789012345678901234'
        const password = 'password'
        const newPassword = ''
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, password, newPassword, newPasswordConfirm, () => { })).to.throw(RangeError, 'new password has less than 8 characters')
    })

    it('should fail on new password shorter than 8 characters', () => {
        const userId = '123456789012345678901234'
        const password = 'password'
        const newPassword = '123'
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, password, newPassword, newPasswordConfirm, () => { })).to.throw(RangeError, 'new password has less than 8 characters')
    })

    it('should fail on non-string new password', () => {
        const userId = '123456789012345678901234'
        const password = 'password'
        const newPasswordConfirm = 'new-password'

        expect(() => updateUserPassword(userId, password, undefined, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, password, 1, newPasswordConfirm, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, password, true, newPasswordConfirm, () => {})).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, password, [], newPasswordConfirm, () => {})).to.throw(TypeError, 'password is not a string')
        expect(() => updateUserPassword(userId, password, {}, newPasswordConfirm, () => {})).to.throw(TypeError, 'password is not a string')
    })
})
