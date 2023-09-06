require('dotenv').config()

const { expect } = require('chai')
const createSuggestion = require('../createSuggestion')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('createSuggestion', () => {
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

    it('succeeds on creating suggestion', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            await createSuggestion(userId, postId, suggestionTitle, suggestionContent)

            const suggestion = await Suggestion.findOne({ author: userId })
            
            expect(suggestion).to.exist

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

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await createSuggestion(wrongUserId, postId, suggestionTitle, suggestionContent)

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
            const postId = post._id.toString()

            const suggestionTitle = 'Título de prueba'
            const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await createSuggestion(userId, wrongPostId, suggestionTitle, suggestionContent)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => createSuggestion('', '6102a3cbf245ef001c9a1837', 'Título de prueba', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'
        const suggestionTitle = 'Título de prueba'
        const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

        expect(() => createSuggestion(true, testPostId, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createSuggestion([], testPostId, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createSuggestion({}, testPostId, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createSuggestion(undefined, testPostId, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createSuggestion(1, testPostId, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => createSuggestion('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'Título de prueba', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '', 'Título de prueba', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const suggestionTitle = 'Título de prueba'
        const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

        expect(() => createSuggestion(testUserId, true, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createSuggestion(testUserId, [], suggestionTitle, suggestionContent)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createSuggestion(testUserId, {}, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createSuggestion(testUserId, undefined, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createSuggestion(testUserId, 1, suggestionTitle, suggestionContent)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', 'Título de prueba', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The post id is not hexadecimal.'))
    
    it('fails on empty suggestion title', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The suggestion title field is empty.'))

    it('fails on a non-string suggestion title', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'
        const suggestionContent = 'Este es un texto de prueba para la creación de una sugerencia, que se hace para un test el cual usa unas librerías llamadas "mocha" y "chai"'

        expect(() => createSuggestion(testUserId, testPostId, true, suggestionContent)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, [], suggestionContent)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, {}, suggestionContent)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, undefined, suggestionContent)).to.throw(TypeError, 'The suggestion title is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, 1, suggestionContent)).to.throw(TypeError, 'The suggestion title is not a string.')
    })

    it('fails on suggestion title too long', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'Título de prueba un poco largo. Título de prueba un poco largo.', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The suggestion title is too long.'))
    
    it('fails on empty suggestion title', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '', 'Texto de prueba un poco largo.')).to.throw(ContentError, 'The suggestion title field is empty.'))

    it('fails on a non-string suggestion content', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'
        const suggestionTitle = 'Título de prueba'

        expect(() => createSuggestion(testUserId, testPostId, suggestionTitle, true)).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, suggestionTitle, [])).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, suggestionTitle, {})).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, suggestionTitle, undefined)).to.throw(TypeError, 'The suggestion content is not a string.')
        expect(() => createSuggestion(testUserId, testPostId, suggestionTitle, 1)).to.throw(TypeError, 'The suggestion content is not a string.')
    })

    it('fails on suggestion content too short', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'Título de prueba', 'Texto de prueba muy corto.')).to.throw(ContentError, 'The suggestion content is too short.'))
    
    it('fails on suggestion content too long', () => expect(() => createSuggestion('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'Título de prueba', 'Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. Texto de prueba demasiado largo. ')).to.throw(ContentError, 'The suggestion content is too long.'))

    after(async () => await mongoose.disconnect())
})