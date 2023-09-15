require('dotenv').config()

const { expect } = require('chai')
const hideSuggestion = require('../hideSuggestion')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('hideSuggestion', () => {
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

    it('succeeds on checking suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            await hideSuggestion(userId, suggestionId)

            const _suggestion = await Suggestion.findOne({ author: userId })

            expect(_suggestion).to.exist
            expect(_suggestion).to.be.an('object')
            expect(_suggestion.id).to.equal(suggestionId)
            expect(_suggestion.hidden).to.be.true

        } catch (error) {
            
        }
    })
    
    it('succeeds on unchecking suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent, hidden: true })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            await hideSuggestion(userId, suggestionId)

            const _suggestion = await Suggestion.findOne({ author: userId })

            expect(_suggestion).to.exist
            expect(_suggestion).to.be.an('object')
            expect(_suggestion.id).to.equal(suggestionId)
            expect(_suggestion.checked).to.be.false

        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await hideSuggestion(wrongUserId, suggestionId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })

            const wrongSuggestionId = '6102a3cbf245ef001c9a1837'

            await hideSuggestion(userId, wrongSuggestionId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Suggestion not found.')
        }
    })

    it('fails on empty user id', () => expect(() => hideSuggestion('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'

        expect(() => hideSuggestion(true, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => hideSuggestion([], testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => hideSuggestion({}, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => hideSuggestion(undefined, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => hideSuggestion(1, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => hideSuggestion('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty suggestion id', () => expect(() => hideSuggestion('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The suggestion id does not have 24 characters.'))

    it('fails on a non-string suggestion id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => hideSuggestion(testUserId, true)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => hideSuggestion(testUserId, [])).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => hideSuggestion(testUserId, {})).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => hideSuggestion(testUserId, undefined)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => hideSuggestion(testUserId, 1)).to.throw(TypeError, 'The suggestion id is not a string.')
    })

    it('fails on not hexadecimal suggestion id', () => expect(() => hideSuggestion('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The suggestion id is not hexadecimal.'))


    after(async () => await mongoose.disconnect())
})