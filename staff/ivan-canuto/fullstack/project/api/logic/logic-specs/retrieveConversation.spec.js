require('dotenv').config()

const { expect } = require('chai')
const retrieveConversation = require('../retrieveConversation')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrieveConversation', () => {
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

    it('succeeds on rtrieving the requested conversation', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test Conversation'
            const conversationMessages = [{ role: 'user', content: '¿Quién es Juan Carlos I?' }, { role: 'assistant', content: 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe VI.' }]
            
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle, messages: conversationMessages })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const conversationFound = await retrieveConversation(userId, conversationId)

            expect(conversationFound).to.exist
            expect(conversationFound).to.be.an('object')
            expect(conversationFound.author.toString()).to.equal(userId)
            expect(conversationFound.title).to.equal(conversationTitle)
            expect(conversationFound.messages).to.have.lengthOf(2)
            expect(conversationFound.messages[0].role).to.equal('user')
            expect(conversationFound.messages[0].content).to.equal('¿Quién es Juan Carlos I?')
            expect(conversationFound.messages[1].role).to.equal('assistant')
            expect(conversationFound.messages[1].content).to.equal('Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe VI.')

        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test Conversation'
            const conversationMessages = [{ role: 'user', content: '¿Quién es Juan Carlos I?' }, { role: 'assistant', content: 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe VI.' }]
            
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle, messages: conversationMessages })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            const conversationFound = await retrieveConversation(wrongUserId, conversationId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing conversation', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test Conversation'
            const conversationMessages = [{ role: 'user', content: '¿Quién es Juan Carlos I?' }, { role: 'assistant', content: 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.' }]
            
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle, messages: conversationMessages })

            const conversation = await Conversation.findOne({ author: userId })

            const wrongConversationId = '6102a3cbf245ef001c9a1837'

            const conversationFound = await retrieveConversation(userId, wrongConversationId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Conversation not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrieveConversation('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'

        expect(() => retrieveConversation(true, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversation([], testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversation({}, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversation(undefined, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversation(1, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrieveConversation('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty conversation id', () => expect(() => retrieveConversation('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The conversation id does not have 24 characters.'))

    it('fails on a non-string conversation id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => retrieveConversation(testUserId, true)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => retrieveConversation(testUserId, [])).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => retrieveConversation(testUserId, {})).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => retrieveConversation(testUserId, undefined)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => retrieveConversation(testUserId, 1)).to.throw(TypeError, 'The conversation id is not a string.')
    })

    it('fails on not hexadecimal conversation id', () => expect(() => retrieveConversation('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The conversation id is not hexadecimal.'))


    after(async () => await mongoose.disconnect())
})