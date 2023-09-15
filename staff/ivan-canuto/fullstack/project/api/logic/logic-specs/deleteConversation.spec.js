require('dotenv').config()

const { expect } = require('chai')
const deleteConversation = require('../deleteConversation')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('deleteConversation', () => {
    let user, email

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email

            await populate(user, [])
        } catch (error) {
            
        }
    })

    it('succeeds on creating post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test conversation'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })

            const conversation = await Conversation.findOne({ author: userId })

            expect(conversation).to.exist

            const conversationId = conversation._id.toString()
            
            await deleteConversation(userId, conversationId)

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

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })

            const conversation = await Conversation.findOne({ author: userId })

            expect(conversation).to.exist

            const conversationId = conversation._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await deleteConversation(wrongUserId, conversationId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing conversation', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test conversation'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })

            const conversation = await Conversation.findOne({ author: userId })

            expect(conversation).to.exist
            
            const wrongConversationId = '6102a3cbf245ef001c9a1837'

            await deleteConversation(userId, wrongConversationId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Conversation not found.')
        }
    })

    it('fails on empty user id', () => expect(() => deleteConversation('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteConversation(true, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteConversation([], testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteConversation({}, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteConversation(undefined, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteConversation(1, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteConversation('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty conversation id', () => expect(() => deleteConversation('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The conversation id does not have 24 characters.'))

    it('fails on a non-string conversation id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteConversation(testUserId, true)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => deleteConversation(testUserId, [])).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => deleteConversation(testUserId, {})).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => deleteConversation(testUserId, undefined)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => deleteConversation(testUserId, 1)).to.throw(TypeError, 'The conversation id is not a string.')
    })

    it('fails on not hexadecimal conversationId id', () => expect(() => deleteConversation('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The conversation id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})