require('dotenv').config()

const { expect } = require('chai')
const retrievePostSuggestions = require('../retrievePostSuggestions')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrievePostSuggestions', () => {
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

    it('succeeds on rtrieving the suggestions of a post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Lo que el viento se llevó.'
            const postText = 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'
            
            const suggestionTitle2 = 'Título de prueba número 2.'
            const suggestionContent2 = 'Este es un texto de prueba número 2 para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })
            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle2, content: suggestionContent2 })

            const postSuggestions = await retrievePostSuggestions(userId, postId)

            expect(postSuggestions).to.exist
            expect(postSuggestions).to.be.an('array')
            expect(postSuggestions).to.have.lengthOf(2)

            expect(postSuggestions[0].author.id).to.equal(userId)
            expect(postSuggestions[0].author.name).to.equal(name)
            expect(postSuggestions[0].author.avatar).to.be.null
            expect(postSuggestions[0].title).to.equal(suggestionTitle)
            expect(postSuggestions[0].content).to.equal(suggestionContent)
            expect(postSuggestions[0].checked).to.be.false
            expect(postSuggestions[0].hidden).to.have.false
            
            expect(postSuggestions[1].author.id).to.equal(userId)
            expect(postSuggestions[1].author.name).to.equal(name)
            expect(postSuggestions[1].author.avatar).to.be.null
            expect(postSuggestions[1].title).to.equal(suggestionTitle2)
            expect(postSuggestions[1].content).to.equal(suggestionContent2)
            expect(postSuggestions[1].checked).to.be.false
            expect(postSuggestions[1].hidden).to.have.false

        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Lo que el viento se llevó.'
            const postText = 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'
            
            const suggestionTitle2 = 'Título de prueba número 2.'
            const suggestionContent2 = 'Este es un texto de prueba número 2 para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })
            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle2, content: suggestionContent2 })

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await retrievePostSuggestions(wrongUserId, postId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Lo que el viento se llevó.'
            const postText = 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'
            
            const suggestionTitle2 = 'Título de prueba número 2.'
            const suggestionContent2 = 'Este es un texto de prueba número 2 para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle, content: suggestionContent })
            Suggestion.create({ author: new ObjectId(userId), post: new ObjectId(postId), postAuthor: new ObjectId(userId), title: suggestionTitle2, content: suggestionContent2 })

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await retrievePostSuggestions(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrievePostSuggestions('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => retrievePostSuggestions(true, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePostSuggestions([], testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePostSuggestions({}, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePostSuggestions(undefined, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePostSuggestions(1, testPostId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrievePostSuggestions('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => retrievePostSuggestions('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => retrievePostSuggestions(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePostSuggestions(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePostSuggestions(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePostSuggestions(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePostSuggestions(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => retrievePostSuggestions('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})