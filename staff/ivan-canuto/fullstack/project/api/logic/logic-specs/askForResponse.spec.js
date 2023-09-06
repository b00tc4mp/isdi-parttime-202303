require('dotenv').config()

const { expect } = require('chai')
const askForResponse = require('../askForResponse')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('askFroResponse', () => {
    let user

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

    it('succeeds on recieving response', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Conversation.create({ author: new ObjectId(userId), title: 'Test conversation', messages: [] })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const currentConversation = [{role: 'user', content: 'Hello'}]

            const response = await askForResponse(userId, conversationId, currentConversation)

            expect(response).to.be.an('object')
            expect(response.role).to.equal('assistant')
            expect(response.content).to.be.a('string')

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Conversation.create({ author: new ObjectId(userId), title: 'Test conversation', messages: [] })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            const currentConversation = [{role: 'user', content: 'Hello, how are you?'}]

            await askForResponse(wrongUserId, conversationId, currentConversation)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing conversation', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Conversation.create({ author: new ObjectId(userId), title: 'Test conversation', messages: [] })

            const wrongConversationId = '6102a3cbf245ef001c9a1837'

            const currentConversation = [{role: 'user', content: 'Hello, how are you?'}]

            await askForResponse(userId, wrongConversationId, currentConversation)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Conversation not found.')
        }
    })

    it('fails on empty user id', () => expect(() => askForResponse('', '6102a3cbf245ef001c9a1837', [{role: 'user', content: 'Hello, how are you?'}])).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'
        const currentConversation = [{role: 'user', content: 'Hello, how are you?'}]

        expect(() => askForResponse(true, testConversationId, currentConversation)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => askForResponse([], testConversationId, currentConversation)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => askForResponse({}, testConversationId, currentConversation)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => askForResponse(undefined, testConversationId, currentConversation)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => askForResponse(1, testConversationId, currentConversation)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => askForResponse('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', [{role: 'user', content: 'Hello, how are you?'}])).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty conversation id', () => expect(() => askForResponse('6102a3cbf245ef001c9a1837', '', [{role: 'user', content: 'Hello, how are you?'}])).to.throw(ContentError, 'The conversation id does not have 24 characters.'))

    it('fails on a non-string conversation id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const currentConversation = [{role: 'user', content: 'Hello, how are you?'}]

        expect(() => askForResponse(testUserId, true, currentConversation)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => askForResponse(testUserId, [], currentConversation)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => askForResponse(testUserId, {}, currentConversation)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => askForResponse(testUserId, undefined, currentConversation)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => askForResponse(testUserId, 1, currentConversation)).to.throw(TypeError, 'The conversation id is not a string.')
    })

    it('fails on not hexadecimal conversation id', () => expect(() => askForResponse('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', [{role: 'user', content: 'Hello, how are you?'}])).to.throw(ContentError, 'The conversation id is not hexadecimal.'))

    it('fails on empty current conversation is not a string', () => {
        expect(() => askForResponse('6102a3cbf245ef001c9a1837', '6102a3cbf345ef001c9a3601', 'currentConversation')).to.throw(TypeError, 'The current conversation is not an array.')
        expect(() => askForResponse('6102a3cbf245ef001c9a1837', '6102a3cbf345ef001c9a3601', true)).to.throw(TypeError, 'The current conversation is not an array.')
        expect(() => askForResponse('6102a3cbf245ef001c9a1837', '6102a3cbf345ef001c9a3601', {})).to.throw(TypeError, 'The current conversation is not an array.')
        expect(() => askForResponse('6102a3cbf245ef001c9a1837', '6102a3cbf345ef001c9a3601', undefined)).to.throw(TypeError, 'The current conversation is not an array.')
        expect(() => askForResponse('6102a3cbf245ef001c9a1837', '6102a3cbf345ef001c9a3601', 1)).to.throw(TypeError, 'The current conversation is not an array.')
    })

    after(async () => await mongoose.disconnect())
})