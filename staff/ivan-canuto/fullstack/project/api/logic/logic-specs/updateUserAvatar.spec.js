require('dotenv').config()

const { expect } = require('chai')
const updateUserAvatar = require('../updateUserAvatar')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('updateUserAvatar', () => {
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

    it('succeeds on updating the user avatar', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const newAvatarUrl = 'this-is-the-new-avatar-url.jpg'

            await updateUserAvatar(userId, newAvatarUrl, password)

            const _user2 = await User.findOne({ email: user.email })

            expect(_user2).to.exist
            expect(_user2).to.be.an('object')
            expect(_user2.avatar).to.equal(newAvatarUrl)

        } catch (error) {
            expect(error).to.be.null
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })

            const newAvatarUrl = 'this-is-the-new-avatar-url.jpg'

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await updateUserAvatar(wrongUserId, newAvatarUrl, password)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => updateUserAvatar('', 'this-is-the-new-avatar-url.jpg', '123123123')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testNewAvatarUrl = 'this-is-the-new-avatar-url.jpg'
        const testUserPassword = '123123123'

        expect(() => updateUserAvatar(true, testNewAvatarUrl, testUserPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserAvatar([], testNewAvatarUrl, testUserPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserAvatar({}, testNewAvatarUrl, testUserPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserAvatar(undefined, testNewAvatarUrl, testUserPassword)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateUserAvatar(1, testNewAvatarUrl, testUserPassword)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => updateUserAvatar('-102a3cbf245ef001c9a1837', 'this-is-the-new-avatar-url.jpg', '123123123')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    it('fails on empty new avatar url', () => expect(() => updateUserAvatar('6102a3cbf245ef001c9a1837', '', '123123123')).to.throw(ContentError, 'The new avatar url field is empty.'))

    it('fails on a non-string new avatar url', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testUserPassword = '123123123'
        
        expect(() => updateUserAvatar(testUserId, true, testUserPassword)).to.throw(TypeError, 'The new avatar url is not a string.')
        expect(() => updateUserAvatar(testUserId, [], testUserPassword)).to.throw(TypeError, 'The new avatar url is not a string.')
        expect(() => updateUserAvatar(testUserId, {}, testUserPassword)).to.throw(TypeError, 'The new avatar url is not a string.')
        expect(() => updateUserAvatar(testUserId, undefined, testUserPassword)).to.throw(TypeError, 'The new avatar url is not a string.')
        expect(() => updateUserAvatar(testUserId, 1, testUserPassword)).to.throw(TypeError, 'The new avatar url is not a string.')
    })

    it('fails on new avatar url does not include a .jpg/.jpg/.webp/.png extension.', () => expect(() => updateUserAvatar('6102a3cbf245ef001c9a1837', 'this-is-the-new-avatar-url.gif', '123123123')).to.throw(ContentError, 'The url entered does not includes a .jpg/.jpg/.webp/.png extension.'))
    
    it('fails on password length lower than 6 characters', () => expect(() => updateUserAvatar('6102a3cbf245ef001c9a1837', 'this-is-the-new-avatar-url.jpg', '123')).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string password', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testNewAvatarUrl = 'this-is-the-new-avatar-url.jpg'
        
        expect(() => updateUserAvatar(testUserId, testNewAvatarUrl, true)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserAvatar(testUserId, testNewAvatarUrl, [])).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserAvatar(testUserId, testNewAvatarUrl, {})).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserAvatar(testUserId, testNewAvatarUrl, undefined)).to.throw(TypeError, 'The password is not a string.')
        expect(() => updateUserAvatar(testUserId, testNewAvatarUrl, 1)).to.throw(TypeError, 'The password is not a string.')
    })


    after(async () => await mongoose.disconnect())
})