require('dotenv').config()

const { expect } = require('chai')
const createPost = require('../createPost')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('createPost', () => {
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

    it('succeeds on creating post', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const conversationTitle = 'Test conversation'

            await Conversation.create({ author: new ObjectId(userId), title: conversationTitle })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const summaryText = 'This is a summary text for testing.'
            
            await createPost(userId, conversationId, summaryText)

            const post = await Post.findOne({ author: userId })

            expect(post).to.be.an('object')
            expect(post.author.toString()).to.equal(userId)
            expect(post.title).to.equal(conversationTitle)
            expect(post.text).to.equal(summaryText)
            expect(post.image).to.equal(undefined)
            expect(post.likes).to.be.an('array')
            expect(post.visible).to.equal(true)
            expect(post.comments).to.be.an('array')

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Conversation.create({ author: new ObjectId(userId), title: 'Test conversation', messages: [] })

            const conversation = await Conversation.findOne({ author: userId })
            const conversationId = conversation._id.toString()

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await createPost(wrongUserId, conversationId, 'This is a summary text for testing.')

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing conversation', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()
            
            await Conversation.create({ author: new ObjectId(userId), title: 'Test conversation', messages: [] })

            const wrongConversationId = '6102a3cbf245ef001c9a1837'

            await createPost(userId, wrongConversationId, 'This is a summary text for testing.')

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Conversation not found.')
        }
    })

    it('fails on empty user id', () => expect(() => createPost('', '6102a3cbf245ef001c9a1837', 'This is a summary text for testing.')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testConversationId = '6102a3cbf245ef001c9a1837'
        const summaryText = 'This is a summary text for testing.'

        expect(() => createPost(true, testConversationId, summaryText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createPost([], testConversationId, summaryText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createPost({}, testConversationId, summaryText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createPost(undefined, testConversationId, summaryText)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createPost(1, testConversationId, summaryText)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => createPost('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 'This is a summary text for testing.')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty conversation id', () => expect(() => createPost('6102a3cbf245ef001c9a1837', '', 'This is a summary text for testing.')).to.throw(ContentError, 'The conversation id does not have 24 characters.'))

    it('fails on a non-string conversation id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const summaryText = 'This is a summary text for testing.'

        expect(() => createPost(testUserId, true, summaryText)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => createPost(testUserId, [], summaryText)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => createPost(testUserId, {}, summaryText)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => createPost(testUserId, undefined, summaryText)).to.throw(TypeError, 'The conversation id is not a string.')
        expect(() => createPost(testUserId, 1, summaryText)).to.throw(TypeError, 'The conversation id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => createPost('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', 'This is a summary text for testing.')).to.throw(ContentError, 'The conversation id is not hexadecimal.'))

    it('fails on empty summary text', () => expect(() => createPost('6102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The summary text field is empty.'))

    it('fails on a non-string summary text', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        const testPostId = '6102a3cbf245ef001c9a1837'
        
        expect(() => createPost(testUserId, testPostId, true)).to.throw(TypeError, 'The summary text is not a string.')
        expect(() => createPost(testUserId, testPostId, [])).to.throw(TypeError, 'The summary text is not a string.')
        expect(() => createPost(testUserId, testPostId, {})).to.throw(TypeError, 'The summary text is not a string.')
        expect(() => createPost(testUserId, testPostId, undefined)).to.throw(TypeError, 'The summary text is not a string.')
        expect(() => createPost(testUserId, testPostId, 1)).to.throw(TypeError, 'The summary text is not a string.')
    })

    after(async () => await mongoose.disconnect())
})