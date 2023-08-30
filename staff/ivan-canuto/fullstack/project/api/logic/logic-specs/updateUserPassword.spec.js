require('dotenv').config()

const { expect } = require('chai')
const updateUserPassword = require('../updateUserPassword')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError, AuthError } } = require('com')
const { User } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('updateUserPassword', () => {
    let user, email, password

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            password = user.password
            email = user.email

            await populate(user, [])
        } catch (error) {
            throw new Error(error.message)
        }
    })

    it('succeeds on updating the user password', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const newPassword = '123123123'

            await updateUserPassword(userId, password, newPassword, newPassword)

            const _user2 = await User.findOne({ email: user.email })

            expect(_user2).to.exist
            expect(_user2).to.be.an('object')
            expect(_user2.password).to.equal(newPassword)

        } catch (error) {
            expect(error).to.be.null
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const newPassword = '123123123'

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await updateUserPassword(wrongUserId, password, newPassword, newPassword)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on wrong user password', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            const newPassword = '123123123'
            const wrongPassword = 'wrong-password'
            
            await updateUserPassword(userId, wrongPassword, newPassword, newPassword)

        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('Wrong credentials.')
        }
    })
    
    it('fails on new passwords do not match', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            const newPassword = '123123123'
            const wrongPasswordConfirm = 'wrong-password-confirm'
            
            await updateUserPassword(userId, password, newPassword, wrongPasswordConfirm)

        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('The new passwords do not match.')
        }
    })

    it('fails on empty user id', () => expect(() => updateUserPassword('', 'this-is-the-new-avatar-url.jpg', '123123123')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testNewAvatarUrl = 'this-is-the-new-avatar-url.jpg'
        const testNewPassword = '123123123'

        expect(() => updateUserPassword(true, testNewAvatarUrl, testNewPassword, testNewPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserPassword([], testNewAvatarUrl, testNewPassword, testNewPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserPassword({}, testNewAvatarUrl, testNewPassword, testNewPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserPassword(undefined, testNewAvatarUrl, testNewPassword, testNewPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserPassword(1, testNewAvatarUrl, testNewPassword, testNewPassword)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => updateUserPassword('-102a3cbf245ef001c9a1837', 'this-is-the-new-avatar-url.jpg', '123123123')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    it('fails on password length lower than 6 characters', () => expect(() => updateUserPassword('6102a3cbf245ef001c9a1837', '123', '123123123', '123123123')).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string user password', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testNewPassword = '123123123'
        
        expect(() => updateUserPassword(testUserId, true, testNewPassword, testNewPassword)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserPassword(testUserId, [], testNewPassword, testNewPassword)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserPassword(testUserId, {}, testNewPassword, testNewPassword)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserPassword(testUserId, undefined, testNewPassword, testNewPassword)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserPassword(testUserId, 1, testNewPassword, testNewPassword)).to.throw(TypeError, 'The password is not a string.')
    })

    it('fails on password length lower than 6 characters', () => expect(() => updateUserPassword('6102a3cbf245ef001c9a1837', '123123123', '123', '123123123')).to.throw(RangeError, 'The new password is lower than 6 characters.'))

    it('fails on a non-string new password', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testNewPassword = '123123123'
        
        expect(() => updateUserPassword(testUserId, password, true, testNewPassword)).to.throw(TypeError, 'The new password is not a string.')
        expect(() => updateUserPassword(testUserId, password, [], testNewPassword)).to.throw(TypeError, 'The new password is not a string.')
        expect(() => updateUserPassword(testUserId, password, {}, testNewPassword)).to.throw(TypeError, 'The new password is not a string.')
        expect(() => updateUserPassword(testUserId, password, undefined, testNewPassword)).to.throw(TypeError, 'The new password is not a string.')
        expect(() => updateUserPassword(testUserId, password, 1, testNewPassword)).to.throw(TypeError, 'The new password is not a string.')
    })

    it('fails on password length lower than 6 characters', () => expect(() => updateUserPassword('6102a3cbf245ef001c9a1837', '123123123', '123123123', '123',)).to.throw(RangeError, 'The new password confirm is lower than 6 characters.'))

    it('fails on a non-string new password confirmation', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testNewPassword = '123123123'
        
        expect(() => updateUserPassword(testUserId, password, testNewPassword, true)).to.throw(TypeError, 'The new password confirm is not a string.')
        expect(() => updateUserPassword(testUserId, password, testNewPassword, [])).to.throw(TypeError, 'The new password confirm is not a string.')
        expect(() => updateUserPassword(testUserId, password, testNewPassword, {})).to.throw(TypeError, 'The new password confirm is not a string.')
        expect(() => updateUserPassword(testUserId, password, testNewPassword, undefined)).to.throw(TypeError, 'The new password confirm is not a string.')
        expect(() => updateUserPassword(testUserId, password, testNewPassword, 1)).to.throw(TypeError, 'The new password confirm is not a string.')
    })

    after(async () => await mongoose.disconnect())
})