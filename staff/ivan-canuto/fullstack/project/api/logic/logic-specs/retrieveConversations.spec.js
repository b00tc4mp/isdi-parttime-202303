require('dotenv').config()

const { expect } = require('chai')
const retrieveConversations = require('../retrieveConversations')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrieveConversations', () => {
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

    it('succeeds on rtrieving all conversations', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test Conversation'
            const conversationMessages = [{ role: 'user', content: '¿Quién es Juan Carlos I?' }, { role: 'assistant', content: 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe VI.' }]
            
            const conversationTitle2 = 'Test Conversation number 2'
            const conversationMessages2 = [{ role: 'user', content: '¿Quién es Felipe VI?' }, { role: 'assistant', content: 'Felipe VI es el actual rey de España, perteneciente a la dinastía de los Borbones, hijo de Juan Carlos I, quien abdicó en 2014 para cederle el trono a él.' }]
            
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle, messages: conversationMessages })
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle2, messages: conversationMessages2 })

            const conversationsFound = await retrieveConversations(userId)

            expect(conversationsFound).to.exist
            expect(conversationsFound).to.be.an('array')
            expect(conversationsFound).to.have.lengthOf(2)
            expect(conversationsFound[0].title).to.equal(conversationTitle2)
            expect(conversationsFound[1].title).to.equal(conversationTitle)
            expect(conversationsFound[0].id).to.exist
            expect(conversationsFound[1].id).to.exist

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test Conversation'
            const conversationMessages = [{ role: 'user', content: '¿Quién es Juan Carlos I?' }, { role: 'assistant', content: 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe VI.' }]
            
            const conversationTitle2 = 'Test Conversation number 2'
            const conversationMessages2 = [{ role: 'user', content: '¿Quién es Felipe VI?' }, { role: 'assistant', content: 'Felipe VI es el actual rey de España, perteneciente a la dinastía de los Borbones, hijo de Juan Carlos I, quien abdicó en 2014 para cederle el trono a él.' }]
            
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle, messages: conversationMessages })
            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle2, messages: conversationMessages2 })

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            const conversationsFound = await retrieveConversations(wrongUserId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrieveConversations('')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        expect(() => retrieveConversations(true)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversations([])).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversations({})).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversations(undefined)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveConversations(1)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrieveConversations('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})