require('dotenv').config()

const { expect } = require('chai')
const updateSuggestion = require('../updateSuggestion')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('updateSuggestion', () => {
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

    it('succeeds on updating the title and the content of the suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: 'Suggestion title', content: 'This is the content of the created suggestion to do this test.' })
            
            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            const newTitleSuggestion = 'New post title'
            const newSuggestionContent = 'This is the new content of the post which have to be a tillte bit longer to be acceptable.'

            await updateSuggestion(userId, suggestionId, newTitleSuggestion, newSuggestionContent)

            const _suggestion = await Suggestion.findOne({ author: userId })

            expect(_suggestion).to.exist
            expect(_suggestion).to.be.an('object')
            expect(_suggestion.title).to.equal(newTitleSuggestion)
            expect(_suggestion.content).to.equal(newSuggestionContent)

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

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: 'Suggestion title', content: 'This is the content of the created suggestion to do this test.' })
            
            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            const newTitleSuggestion = 'New post title'
            const newSuggestionContent = 'This is the new content of the post which have to be a tillte bit longer to be acceptable.'

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await updateSuggestion(wrongUserId, suggestionId, newTitleSuggestion, newSuggestionContent)

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

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: 'Suggestion title', content: 'This is the content of the created suggestion to do this test.' })
            
            await Suggestion.findOne({ author: userId })

            const newTitleSuggestion = 'New post title'
            const newSuggestionContent = 'This is the new content of the post which have to be a tillte bit longer to be acceptable.'

            const wrongSuggestionId = '6102a3cbf245ef001c9a1837'

            await updateSuggestion(userId, wrongSuggestionId, newTitleSuggestion, newSuggestionContent)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Suggestion not found.')
        }
    })

    it('fails on empty user id', () => expect(() => updateSuggestion('', '6102a3cbf245ef001c9a1837', 'New post title', 'This is the new text of the post.')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testSuggestionId = '6102a3cbf245ef001c9a1837'
        const testSuggestionTitle = 'New post title'
        const testSuugestionText = 'This is the new text of the post.'

        expect(() => updateSuggestion(true, testSuggestionId, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateSuggestion([], testSuggestionId, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateSuggestion({}, testSuggestionId, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateSuggestion(undefined, testSuggestionId, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => updateSuggestion(1, testSuggestionId, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => updateSuggestion('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'New post title', 'This is the new text of the post.')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty suggestion id', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '', 'New suggestion title', 'This is the new text of the suggestion.')).to.throw(ContentError, 'The suggestion id does not have 24 characters.'))

    it('fails on a non-string suggestion id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testSuggestionTitle = 'New suggestion title'
        const testSuugestionText = 'This is the new text of the suggestion.'

        expect(() => updateSuggestion(testUserId, true, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => updateSuggestion(testUserId, [], testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => updateSuggestion(testUserId, {}, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => updateSuggestion(testUserId, undefined, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => updateSuggestion(testUserId, 1, testSuggestionTitle, testSuugestionText)).to.throw(TypeError, 'The suggestion id is not a string.')
    })

    it('fails on not hexadecimal suggestion id', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', 'New suggestion title', 'This is the new text of the suggestion.')).to.throw(ContentError, 'The suggestion id is not hexadecimal.'))

    it('fails on empty suggestion title', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '', 'This is the new text of the suggestion.')).to.throw(ContentError, 'The suggestion title field is empty.'))

    it('fails on a non-string suggestion title', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testSuggestionId = '6102a3cbf245ef001c9a1837'
        const testSuugestionText = 'This is the new text of the suggestion.'
        
        expect(() => updateSuggestion(testUserId, testSuggestionId, true, testSuugestionText)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, [], testSuugestionText)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, {}, testSuugestionText)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, undefined, testSuugestionText)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, 1, testSuugestionText)).to.throw(TypeError, 'The suggestion title is not a string.')
    })

    it('fails on suggestion title too long', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'This is the new beautiful title of the suggestion.', 'This is the new content of the suggestion. This is the new content of the suggestion. ')).to.throw(ContentError, 'The suggestion title is too long.'))
    
    it('fails on empty suggestion content', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'New suggestion title', '')).to.throw(ContentError, 'The suggestion content field is empty.'))

    it('fails on a non-string suggestion content', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testSuggestionId = '6102a3cbf245ef001c9a1837'
        const testSuggestionTitle = 'New suggestion title'
        
        expect(() => updateSuggestion(testUserId, testSuggestionId, testSuggestionTitle, true)).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, testSuggestionTitle, [])).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, testSuggestionTitle, {})).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, testSuggestionTitle, undefined)).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => updateSuggestion(testUserId, testSuggestionId, testSuggestionTitle, 1)).to.throw(TypeError, 'The suggestion content is not a string.')
    })

    it('fails on suggestion content too short', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'New suggestion title', 'The new suggestion content.')).to.throw(ContentError, 'The suggestion content is too short.'))

    it('fails on suggestion content too short', () => expect(() => updateSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'New suggestion title', 'This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. This is the new content of the suggestion. ')).to.throw(ContentError, 'The suggestion content is too long.'))


    after(async () => await mongoose.disconnect())
})