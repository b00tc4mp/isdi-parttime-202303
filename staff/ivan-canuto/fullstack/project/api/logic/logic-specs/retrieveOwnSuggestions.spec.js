require('dotenv').config()

const { expect } = require('chai')
const retrieveOwnSuggestions = require('../retrieveOwnSuggestions')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrieveOwnSuggestions', () => {
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

    it('succeeds on rtrieving user suggestions', async () => {
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

            const ownSuggestions = await retrieveOwnSuggestions(userId)

            expect(ownSuggestions).to.exist
            expect(ownSuggestions).to.be.an('array')
            expect(ownSuggestions).to.have.lengthOf(2)

            expect(ownSuggestions[0].author).to.equal(userId)
            expect(ownSuggestions[0].post).to.equal(postId)
            expect(ownSuggestions[0].postAuthor.id).to.equal(userId)
            expect(ownSuggestions[0].postAuthor.name).to.equal(name)
            expect(ownSuggestions[0].postAuthor.avatar).to.be.null
            expect(ownSuggestions[0].title).to.equal(suggestionTitle)
            expect(ownSuggestions[0].content).to.equal(suggestionContent)

            expect(ownSuggestions[1].author).to.equal(userId)
            expect(ownSuggestions[1].post).to.equal(postId)
            expect(ownSuggestions[1].postAuthor.id).to.equal(userId)
            expect(ownSuggestions[1].postAuthor.name).to.equal(name)
            expect(ownSuggestions[1].postAuthor.avatar).to.be.null
            expect(ownSuggestions[1].title).to.equal(suggestionTitle2)
            expect(ownSuggestions[1].content).to.equal(suggestionContent2)

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

            const ownSuggestions = await retrieveOwnSuggestions(wrongUserId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrieveOwnSuggestions('')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        expect(() => retrieveOwnSuggestions(true)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveOwnSuggestions([])).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveOwnSuggestions({})).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveOwnSuggestions(undefined)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveOwnSuggestions(1)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrieveOwnSuggestions('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})