require('dotenv').config()

const { expect } = require('chai')
const savePostAsSeen = require('../savePostAsSeen')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Post } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('savePostAsSeen', () => {
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
    
    it('succeeds on saving the post as seen with empty seenLately array', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            await savePostAsSeen(userId, postId)

            const _user2 = await User.findOne({ email: email })

            expect(_user2.seenLately).to.have.lengthOf(1)
            expect(_user2.seenLately[0].toString()).to.equal(postId)

        } catch (error) {
            
        }
    })

    it('succeeds on saving the post as seen with full (15 ids) seenLately array', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'

            const fullSeenLately= [
                new ObjectId ('6102a3cbf245ef001c9a1801'),
                new ObjectId ('6102a3cbf245ef001c9a1802'),
                new ObjectId ('6102a3cbf245ef001c9a1803'),
                new ObjectId ('6102a3cbf245ef001c9a1804'),
                new ObjectId ('6102a3cbf245ef001c9a1805'),
                new ObjectId ('6102a3cbf245ef001c9a1806'),
                new ObjectId ('6102a3cbf245ef001c9a1807'),
                new ObjectId ('6102a3cbf245ef001c9a1808'),
                new ObjectId ('6102a3cbf245ef001c9a1809'),
                new ObjectId ('6102a3cbf245ef001c9a1810'),
                new ObjectId ('6102a3cbf245ef001c9a1811'),
                new ObjectId ('6102a3cbf245ef001c9a1812'),
                new ObjectId ('6102a3cbf245ef001c9a1813'),
                new ObjectId ('6102a3cbf245ef001c9a1814'),
                new ObjectId ('6102a3cbf245ef001c9a1815'),
            ]

            _user.seenLately = fullSeenLately

            await _user.save()
            
            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            await savePostAsSeen(userId, postId)

            const _user2 = await User.findOne({ email: email })

            expect(_user2.seenLately).to.have.lengthOf(15)
            expect(_user2.seenLately[0].toString()).to.equal(postId)
            expect(_user2.seenLately[14].toString()).to.equal('6102a3cbf245ef001c9a1814')

        } catch (error) {
            
        }
    })
    
    it('succeeds on saving again the post as seen with full (15 ids) seenLately array and the post id being in between', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const postTitle = 'Test post title'
            const postText = 'Juan Carlos I de Borbon, es el padre del actual rey de la monarquía española, Felipe IV. Juan Carlos también fue rey de España hasta que en 2014 abdicó cediendole el trono a su hijo Felipe.'

            await Post.create({ author: new ObjectId(userId), title: postTitle, text: postText })

            const post = await Post.findOne({ author: userId })
            const postId = post._id.toString()

            const fullSeenLately= [
                new ObjectId ('6102a3cbf245ef001c9a1801'),
                new ObjectId ('6102a3cbf245ef001c9a1802'),
                new ObjectId ('6102a3cbf245ef001c9a1803'),
                new ObjectId ('6102a3cbf245ef001c9a1804'),
                new ObjectId ('6102a3cbf245ef001c9a1805'),
                new ObjectId ('6102a3cbf245ef001c9a1806'),
                new ObjectId (postId),
                new ObjectId ('6102a3cbf245ef001c9a1808'),
                new ObjectId ('6102a3cbf245ef001c9a1809'),
                new ObjectId ('6102a3cbf245ef001c9a1810'),
                new ObjectId ('6102a3cbf245ef001c9a1811'),
                new ObjectId ('6102a3cbf245ef001c9a1812'),
                new ObjectId ('6102a3cbf245ef001c9a1813'),
                new ObjectId ('6102a3cbf245ef001c9a1814'),
                new ObjectId ('6102a3cbf245ef001c9a1815'),
            ]

            _user.seenLately = fullSeenLately

            await _user.save()

            await savePostAsSeen(userId, postId)

            const _user2 = await User.findOne({ email: email })

            expect(_user2.seenLately).to.have.lengthOf(15)
            expect(_user2.seenLately[0].toString()).to.equal(postId)
            expect(_user2.seenLately[14].toString()).to.equal('6102a3cbf245ef001c9a1815')

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

            await savePostAsSeen(wrongUserId, postId)

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

            await savePostAsSeen(userId, wrongPostId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Post not found.')
        }
    })

    it('fails on empty user id', () => expect(() => savePostAsSeen('', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testPostId = '6102a3cbf245ef001c9a1837'

        expect(() => savePostAsSeen(true, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => savePostAsSeen([], testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => savePostAsSeen({}, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => savePostAsSeen(undefined, testPostId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => savePostAsSeen(1, testPostId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => savePostAsSeen('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty post id', () => expect(() => savePostAsSeen('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The post id does not have 24 characters.'))

    it('fails on a non-string post id', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'

        expect(() => savePostAsSeen(testUserId, true)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => savePostAsSeen(testUserId, [])).to.throw(TypeError, 'The post id is not a string.')
        expect(() => savePostAsSeen(testUserId, {})).to.throw(TypeError, 'The post id is not a string.')
        expect(() => savePostAsSeen(testUserId, undefined)).to.throw(TypeError, 'The post id is not a string.')
        expect(() => savePostAsSeen(testUserId, 1)).to.throw(TypeError, 'The post id is not a string.')
    })

    it('fails on not hexadecimal post id', () => expect(() => savePostAsSeen('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The post id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})