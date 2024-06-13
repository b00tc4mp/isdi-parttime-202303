require('dotenv').config()

const { expect } = require('chai')
const retrievePost = require('../retrievePost')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrievePost', () => {
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

    it('succeeds on rtrieving the requested post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: userId })

            _user.favs.push(post._id)
            post.likes.push(_user._id)
            post.comments.push({ author: 'testUserName', authorId: _user._id, text: 'test comment content'})

            await _user.save()
            await post.save()
            
            const postId = post._id.toString()

            const postFound = await retrievePost(userId, postId)

            expect(postFound).to.exist
            expect(postFound).to.be.an('object')
            expect(postFound.author.id).to.equal(userId)
            expect(postFound.author.name).to.equal(name)
            expect(postFound.author.avatar).to.be.null
            expect(postFound.title).to.equal(postTitle)
            expect(postFound.text).to.equal(postText)
            expect(postFound.likes).to.be.an('array')
            expect(postFound.likes).to.have.lengthOf(1)
            expect(postFound.visible).to.be.true
            expect(postFound.comments).to.be.an('array')
            expect(postFound.comments).to.have.lengthOf(1)
            expect(postFound.comments[0].author).to.equal('testUserName')
            expect(postFound.comments[0].authorId.toString()).to.equal(userId)
            expect(postFound.comments[0].text).to.equal('test comment content')
            expect(postFound.liked).to.be.true
            expect(postFound.fav).to.be.true

        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await retrievePost(wrongUserId, postId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await retrievePost(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrievePost('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => retrievePost(true, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePost([], testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePost({}, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePost(undefined, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrievePost(1, testPostId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrievePost('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => retrievePost('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => retrievePost(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePost(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePost(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePost(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => retrievePost(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => retrievePost('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})