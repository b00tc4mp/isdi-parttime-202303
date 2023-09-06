require('dotenv').config()

const { expect } = require('chai')
const deleteComment = require('../deleteComment')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('deleteComment', () => {
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

    it('succeeds on deleting comment', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            await Post.create({ author: new ObjectId(userId), title: 'Lo que el viento se llevo', text: 'Lo que el viento se llevó es una película muy famosa del siglo XX y que tuvo mucho éxito en taquilla.'})

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const comment = {
                author: _user.name,
                authorId: _user._id,
                text: '¡Que post más interesante!'
            }

            post.comments.push(comment)

            await post.save()

            const _post = await Post.findOne({ author: userId })
            const comments = _post.comments
            
            expect(comments).to.have.lengthOf(1)

            const _comment = comments.find(com => com.authorId.toString() === userId)
            const commentId = _comment._id.toString()

            await deleteComment(userId, postId, commentId)

            const post2 = await Post.findOne({ author: userId })
            const comments2 = post2.comments
            
            expect(comments2).to.have.lengthOf(0)

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

            const comment = {
                author: _user.name,
                authorId: _user._id,
                text: '¡Que post más interesante!'
            }

            post.comments.push(comment)

            await post.save()

            const _post = await Post.findOne({ author: userId })
            const comments = _post.comments
            
            expect(comments).to.have.lengthOf(1)

            const _comment = comments.find(com => com.authorId.toString() === userId)
            const commentId = _comment._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await deleteComment(wrongUserId, postId, commentId)

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

            const comment = {
                author: _user.name,
                authorId: _user._id,
                text: '¡Que post más interesante!'
            }

            post.comments.push(comment)

            await post.save()

            const _post = await Post.findOne({ author: userId })
            const comments = _post.comments
            
            expect(comments).to.have.lengthOf(1)

            const _comment = comments.find(com => com.authorId.toString() === userId)
            const commentId = _comment._id.toString()

            const wrongPostId = '6102a3cbf245ef001c9a1837'

            await deleteComment(userId, wrongPostId, commentId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => deleteComment('', '6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'
        const testCommentId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteComment(true, testPostId, testCommentId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteComment([], testPostId, testCommentId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteComment({}, testPostId, testCommentId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteComment(undefined, testPostId, testCommentId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteComment(1, testPostId, testCommentId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteComment('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => deleteComment('6102a3cbf245ef001c9a1837', '', 'This is a summary text for testing.')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testCommentId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteComment(testUserId, true, testCommentId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteComment(testUserId, [], testCommentId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteComment(testUserId, {}, testCommentId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteComment(testUserId, undefined, testCommentId)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => deleteComment(testUserId, 1, testCommentId)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => deleteComment('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', 'This is a summary text for testing.')).to.throw(ContentError, 'The post id is not hexadecimal.'))
    
    it('fails on empty comment id', () => expect(() => deleteComment('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The comment id does not have 24 characters.'))

    it('fails on a non-string comment id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteComment(testUserId, testPostId, true)).to.throw(TypeError, 'The comment id is not a string.')
        expect(() => deleteComment(testUserId, testPostId, [])).to.throw(TypeError, 'The comment id is not a string.')
        expect(() => deleteComment(testUserId, testPostId, {})).to.throw(TypeError, 'The comment id is not a string.')
        expect(() => deleteComment(testUserId, testPostId, undefined)).to.throw(TypeError, 'The comment id is not a string.')
        expect(() => deleteComment(testUserId, testPostId, 1)).to.throw(TypeError, 'The comment id is not a string.')
    })

    it('fails on not hexadecimal comment id', () => expect(() => deleteComment('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The comment id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})