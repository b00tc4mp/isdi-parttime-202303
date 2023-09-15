require('dotenv').config()

const { expect } = require('chai')
const storeInputInDB = require('../storeInputInDB')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('storeInputInDB', () => {
    let user, name, email

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            name = user.name
            email = user.email

            await populate(user, [])
        } catch (error) {
            
        }
    })

    it('succeeds on storing input in database', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test conversation'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const userInput = { role: 'user', content: 'Hola, ¿cómo estás?'}
            
            await storeInputInDB(userId, conversationId , userInput)

            const _conversation = await Conversation.findOne({ author: userId })

            expect(_conversation).to.exist
            expect(_conversation._id.toString()).to.equal(conversationId)
            expect(_conversation).to.be.an('object')
            expect(_conversation.messages).to.have.lengthOf(1)
            expect(_conversation.messages[0].role).to.equal('user')
            expect(_conversation.messages[0].content).to.equal('Hola, ¿cómo estás?')

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
            const conversationId = conversation._id.toString()

            const userInput = { role: 'user', content: 'Hola, ¿cómo estás?'}
            
            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await storeInputInDB(wrongUserId, conversationId , userInput)

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

            const userInput = { role: 'user', content: 'Hola, ¿cómo estás?'}
            
            const wrongConversationId = '6102a3cbf245ef001c9a1837'

            await storeInputInDB(userId, wrongConversationId, userInput)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Conversation not found.')
        }
    })

    it('fails on empty user id', () => expect(() => storeInputInDB('', '6102a3cbf245ef001c9a1837', { content: 'Testing object'})).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testUserInput = '¿Qué me puedes decir de Antonio Molina?'

        expect(() => storeInputInDB(true, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => storeInputInDB([], testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => storeInputInDB({}, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => storeInputInDB(undefined, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => storeInputInDB(1, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => storeInputInDB('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', { content: 'Testing object'})).to.throw(ContentError, 'The user id is not hexadecimal.'))

    it('fails on empty conversation id', () => expect(() => storeInputInDB('6102a3cbf245ef001c9a1837', '', { content: 'Testing object'})).to.throw(ContentError, 'The conversation id does not have 24 characters.'))

    it('fails on a non-string conversation id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testObject = { content: 'Testing object'}

        expect(() => storeInputInDB(testUserId, true, testObject)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => storeInputInDB(testUserId, [], testObject)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => storeInputInDB(testUserId, {}, testObject)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => storeInputInDB(testUserId, undefined, testObject)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => storeInputInDB(testUserId, 1, testObject)).to.throw(TypeError, 'The conversation id is not a string.')
    })

    it('fails on not hexadecimal conversationId id', () => expect(() => storeInputInDB('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', {content: 'Testing object'})).to.throw(ContentError, 'The conversation id is not hexadecimal.'))
    
    it('fails on a non-object user input', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testConversationId = '6102a3cbf245ef001c9a1837'
        
        expect(() => storeInputInDB(testUserId, testConversationId, 'hola')).to.throw(TypeError, 'The user input is not an object.')
        expect(() => storeInputInDB(testUserId, testConversationId, true)).to.throw(TypeError, 'The user input is not an object.')
        expect(() => storeInputInDB(testUserId, testConversationId, [])).to.throw(TypeError, 'The user input is not an object.')
        expect(() => storeInputInDB(testUserId, testConversationId, undefined)).to.throw(TypeError, 'The user input is not an object.')
        expect(() => storeInputInDB(testUserId, testConversationId, 1)).to.throw(TypeError, 'The user input is not an object.')
    })
    
    it('fails on a non-valid or non-existing "role" property in user input', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testConversationId = '6102a3cbf245ef001c9a1837'

        expect(() => storeInputInDB(testUserId, testConversationId, { content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: '', content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: true, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: [], content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: {}, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: undefined, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: 1, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: 'assistant', content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The input does not have a user role.')
    })
    
    it('fails on a non-valid or non-existing "content" property in user input', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testConversationId = '6102a3cbf245ef001c9a1837'

        expect(() => storeInputInDB(testUserId, testConversationId, { content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: '', content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: true, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: [], content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: {}, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: undefined, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: 1, content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The "role" property in user input does not exist or is not a string.')
        expect(() => storeInputInDB(testUserId, testConversationId, { role: 'assistant', content: 'Hola, ¿cómo estás?' })).to.throw(ContentError, 'The input does not have a user role.')
    })

    after(async () => await mongoose.disconnect())
})