require('dotenv').config()

const { expect } = require('chai')
const deleteAllConversations = require('../deleteAllConversations')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('deleteAllConversations', () => {
    let user, email

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email

            await populate(user, [])

            await Conversation.deleteMany({})
            
        } catch (error) {
            
        }

    })

    it('succeeds on creating post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test conversation'
            const conversationTitle2 = 'Test conversation 2'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle2 })

            const _conversations = await Conversation.find()

            expect(_conversations).to.have.lengthOf(2)
            
            await deleteAllConversations(userId)

            const conversations = await Conversation.find()
            
            expect(conversations).to.have.lengthOf(0)

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            const conversationTitle = 'Test conversation'
            const conversationTitle2 = 'Test conversation 2'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle2 })

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await deleteAllConversations(wrongUserId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => deleteAllConversations('')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        expect(() => deleteAllConversations(true)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteAllConversations([])).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteAllConversations({})).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteAllConversations(undefined)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteAllConversations(1)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteAllConversations('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})