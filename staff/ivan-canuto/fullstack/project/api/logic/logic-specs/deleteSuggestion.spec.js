require('dotenv').config()

const { expect } = require('chai')
const deleteSuggestion = require('../deleteSuggestion')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('deleteSuggestion', () => {
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

    it('succeeds on deleting suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            await Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: 'This is a test suggestion', content: 'This is the content of a test suggestion. This is the content of a test suggestion. ' })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            expect(user).to.exist
            expect(post).to.exist
            expect(suggestion).to.exist

            await deleteSuggestion(userId, postId, suggestionId)

            const suggestions = await Suggestion.find()
            
            expect(suggestions).to.have.lengthOf(0)

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            await Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: 'This is a test suggestion', content: 'This is the content of a test suggestion. This is the content of a test suggestion. ' })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            expect(user).to.exist
            expect(post).to.exist
            expect(suggestion).to.exist

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await deleteSuggestion(wrongUserId, postId, suggestionId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id

            await Suggestion.create({ author: new ObjectId(userId), post: postId, postAuthor: new ObjectId(userId), title: 'This is a test suggestion', content: 'This is the content of a test suggestion. This is the content of a test suggestion. ' })

            const suggestion = await Suggestion.findOne({ author: userId })
            const suggestionId = suggestion._id.toString()

            expect(user).to.exist
            expect(post).to.exist
            expect(suggestion).to.exist

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await deleteSuggestion(userId, wrongPostId, suggestionId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })
    
    it('fails on non-existing suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            await Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: 'This is a test suggestion', content: 'This is the content of a test suggestion. This is the content of a test suggestion. ' })

            const suggestion = await Suggestion.findOne({ author: userId })

            expect(user).to.exist
            expect(post).to.exist
            expect(suggestion).to.exist
            
            const wrongSuggestionId = '6102a3cbf245ef001c9a1837'

            await deleteSuggestion(userId, postId, wrongSuggestionId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Suggestion not found.')
        }
    })

    it('fails on empty user id', () => expect(() => deleteSuggestion('', '6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'
        const testSuggestionId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteSuggestion(true, testPostId, testSuggestionId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteSuggestion([], testPostId, testSuggestionId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteSuggestion({}, testPostId, testSuggestionId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteSuggestion(undefined, testPostId, testSuggestionId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteSuggestion(1, testPostId, testSuggestionId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteSuggestion('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => deleteSuggestion('6102a3cbf245ef001c9a1837', '', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testSuggestionId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteSuggestion(testUserId, true, testSuggestionId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteSuggestion(testUserId, [], testSuggestionId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteSuggestion(testUserId, {}, testSuggestionId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteSuggestion(testUserId, undefined, testSuggestionId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteSuggestion(testUserId, 1, testSuggestionId)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteSuggestion('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))
    
    it('fails on empty suggestion id', () => expect(() => deleteSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The suggestion id does not have 24 characters.'))

    it('fails on a non-string suggestion id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteSuggestion(testUserId, testPostId, true)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => deleteSuggestion(testUserId, testPostId, [])).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => deleteSuggestion(testUserId, testPostId, {})).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => deleteSuggestion(testUserId, testPostId, undefined)).to.throw(TypeError, 'The suggestion id is not a string.')
        expect(() => deleteSuggestion(testUserId, testPostId, 1)).to.throw(TypeError, 'The suggestion id is not a string.')
    })

    it('fails on not hexadecimal suggestion id', () => expect(() => deleteSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The suggestion id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})