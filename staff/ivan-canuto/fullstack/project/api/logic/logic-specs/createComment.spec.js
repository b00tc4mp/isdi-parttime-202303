require('dotenv').config()

const { expect } = require('chai')
const createComment = require('../createComment')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Comment } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('createComment', () => {
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

    it('succeeds on creating comment', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const commentText = '¡Que post más interesante!'

            await createComment(userId, postId, commentText)

            const _post = await Post.findOne({ author: userId })
            const comment = _post.comments.find(comment => comment.authorId.toString() === userId)

            expect(comment).to.be.an('object')
            expect(comment.author).to.equal(_user.name)
            expect(comment.authorId.toString()).to.equal(_user._id.toString())
            expect(comment.text).to.equal(commentText)

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

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            const commentText = '¡Que post más interesante!'

            await createComment(wrongUserId, postId, commentText)

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

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            const commentText = '¡Que post más interesante!'

            await createComment(userId, wrongPostId, commentText)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => createComment('', '6102a3cbf245ef001c9a1837', '¡Que post más interesante!')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'
        const commentText = '¡Que post más interesante!'

        expect(() => createComment(true, testPostId, commentText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createComment([], testPostId, commentText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createComment({}, testPostId, commentText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createComment(undefined, testPostId, commentText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createComment(1, testPostId, commentText)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => createComment('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '¡Que post más interesante!')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => createComment('6102a3cbf245ef001c9a1837', '', '¡Que post más interesante!')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const commentText = '¡Que post más interesante!'

        expect(() => createComment(testUserId, true, commentText)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createComment(testUserId, [], commentText)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createComment(testUserId, {}, commentText)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createComment(testUserId, undefined, commentText)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => createComment(testUserId, 1, commentText)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => createComment('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', '¡Que post más interesante!')).to.throw(ContentError, 'The post id is not hexadecimal.'))
    
    it('fails on empty comment text', () => expect(() => createComment('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The comment text field is empty.'))

    it('fails on a non-string comment text', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => createComment(testUserId, testPostId, true)).to.throw(TypeError, 'The comment text is not a string.')
        expect(() => createComment(testUserId, testPostId, [])).to.throw(TypeError, 'The comment text is not a string.')
        expect(() => createComment(testUserId, testPostId, {})).to.throw(TypeError, 'The comment text is not a string.')
        expect(() => createComment(testUserId, testPostId, undefined)).to.throw(TypeError, 'The comment text is not a string.')
        expect(() => createComment(testUserId, testPostId, 1)).to.throw(TypeError, 'The comment text is not a string.')
    })

    it('fails on comment text too long', () => expect(() => createComment('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'Texto de prueba super largo. Texto de prueba super largo. Texto de prueba super largo. Texto de prueba super largo. Texto de prueba super largo. Texto de prueba super largo. Texto de prueba super largo. ')).to.throw(ContentError, 'The comment text is too long.'))

    after(async () => await mongoose.disconnect())
})