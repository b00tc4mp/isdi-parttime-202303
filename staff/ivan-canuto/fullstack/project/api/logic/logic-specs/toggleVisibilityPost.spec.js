require('dotenv').config()

const { expect } = require('chai')
const toggleVisibilityPost = require('../toggleVisibilityPost')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('toggleVisibilityPost', () => {
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

    it('succeeds on setting post as private', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id.toString()

            await toggleVisibilityPost(userId, postId)

            const _post = await Post.findOne({ author: userId })

            expect(_post).to.exist
            expect(_post).to.be.an('object')
            expect(_post.id.toString()).to.equal(postId)
            expect(_post.visible).to.be.false

        } catch (error) {
            
        }
    })
    
    it('succeeds on setting post as public', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText, visible: false })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id.toString()

            await toggleVisibilityPost(userId, postId)

            const _post = await Post.findOne({ author: userId })

            expect(_post).to.exist
            expect(_post).to.be.an('object')
            expect(_post.id.toString()).to.equal(postId)
            expect(_post.visible).to.be.true

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
            const postId = post._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await toggleVisibilityPost(wrongUserId, postId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await toggleVisibilityPost(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => toggleVisibilityPost('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => toggleVisibilityPost(true, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleVisibilityPost([], testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleVisibilityPost({}, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleVisibilityPost(undefined, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleVisibilityPost(1, testPostId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => toggleVisibilityPost('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => toggleVisibilityPost('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => toggleVisibilityPost(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleVisibilityPost(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleVisibilityPost(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleVisibilityPost(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleVisibilityPost(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => toggleVisibilityPost('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))


    after(async () => await mongoose.disconnect())
})