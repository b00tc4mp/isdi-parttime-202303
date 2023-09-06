require('dotenv').config()

const { expect } = require('chai')
const toggleSavePost = require('../toggleSavePost')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post, Suggestion } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('toggleSavePost', () => {
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

    it('succeeds on saving post as favorite', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id.toString()

            await toggleSavePost(userId, postId)

            const _user2 = await User.findOne({ email: email })

            expect(_user2).to.exist
            expect(_user2).to.be.an('object')
            expect(_user2.id.toString()).to.equal(userId)
            expect(_user2.favs).to.have.lengthOf(1)
            expect(_user2.favs[0].toString()).to.equal(postId)

        } catch (error) {
            
        }
    })
    
    it('succeeds on unsaving post as favorite', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            const postTitle = 'Test Conversation'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })
            
            const post = await Post.findOne({ author: new ObjectId(userId) })
            const postId = post._id.toString()
            
            _user.favs.push(new ObjectId(postId))

            await _user.save()

            const _user2 = await User.findOne({ email: email })
            expect(_user2.favs).to.have.lengthOf(1)
            expect(_user2.favs[0].toString()).to.equal(postId)

            await toggleSavePost(userId, postId)

            const _user3 = await User.findOne({ email: email })

            expect(_user3).to.exist
            expect(_user3).to.be.an('object')
            expect(_user3.id.toString()).to.equal(userId)
            expect(_user3.favs).to.have.length(0)

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
            
            await toggleSavePost(wrongUserId, postId)

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

            await toggleSavePost(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => toggleSavePost('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => toggleSavePost(true, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleSavePost([], testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleSavePost({}, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleSavePost(undefined, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => toggleSavePost(1, testPostId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => toggleSavePost('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => toggleSavePost('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => toggleSavePost(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleSavePost(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleSavePost(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleSavePost(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => toggleSavePost(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => toggleSavePost('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))


    after(async () => await mongoose.disconnect())
})