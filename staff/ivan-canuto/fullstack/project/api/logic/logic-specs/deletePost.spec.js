require('dotenv').config()

const { expect } = require('chai')
const deletePost = require('../deletePost')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('deletePost', () => {
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

            _user.favs.push(new ObjectId(postId))

            await _user.save()
        
            const _user2 = await User.findOne({ email: user.email })

            expect(_user2.favs).to.have.lengthOf(1)
            expect(_user2.favs[0].toString()).to.equal(postId)

            await deletePost(userId, postId)

            const posts = await Post.find()

            const _user3 = await User.findOne({ email: user.email })

            expect(posts).to.have.lengthOf(0)
            expect(_user3.favs).to.have.lengthOf(0)

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

            expect(post).to.exist

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await deletePost(wrongUserId, postId)

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

            expect(post).to.exist

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await deletePost(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => deletePost('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'
        expect(() => deletePost(true, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deletePost([], testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deletePost({}, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deletePost(undefined, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deletePost(1, testConversationId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deletePost('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => deletePost('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        expect(() => deletePost(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deletePost(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deletePost(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deletePost(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deletePost(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => deletePost('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})