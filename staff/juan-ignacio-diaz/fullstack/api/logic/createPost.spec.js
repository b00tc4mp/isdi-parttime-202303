require('dotenv').config()

const { expect } = require('chai')
const mongoose = require('mongoose')
const { Post } = require('../data/models')

const createPost = require('./createPost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('createPost', () =>{
    let userTest, postTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()
     
        return cleanUp()
        .then(() => populateUser(userTest))
        .then(() => postTest = generatePost(userTest.id))
    })

    it('succeeds on new post', () => {
        return createPost(userTest.id, postTest.image, postTest.text)
            .then(() => Post.find({ }))
            .then(posts => {
                expect (posts).to.have.length(1)

                const post = posts[0]
                expect(post).to.exist
                expect(post.id).to.be.a('string')
                expect(post.image).to.equal(postTest.image)
                expect(post.text).to.equal(postTest.text)
                expect(new Date(post.date)).to.be.a('date')
                expect(post.likes).to.have.lengthOf(0)
                expect(post.lock).to.equal(false)
                expect(post.price).to.equal(0)
            })
    })

    it('succeeds if there are existing posts', () => {
        let postTestIni

        postTestIni = generatePost(userTest.id)

        return populatePost(postTestIni)             
            .then(() => createPost(userTest.id, postTest.image, postTest.text))
            .then(() => Post.find({ }))
            .then(posts => {
                expect (posts).to.have.length(2)
                expect(posts[0].id).to.equal(postTestIni.id)

                const post = posts[1]
                expect(post).to.exist
                expect(post.id).to.be.a('string')
                expect(post.id).to.not.equal(postTestIni.id)
                expect(post.image).to.equal(postTest.image)
                expect(post.text).to.equal(postTest.text)
                expect(new Date(post.date)).to.be.a('date')
                expect(post.likes).to.have.lengthOf(0)
                expect(post.lock).to.equal(false)
                expect(post.price).to.equal(0)
            })
    })

    
    it('fails on existing user', () => {
        const userTestNoExistsId = '000000000000000000000000'

        return createPost(userTestNoExistsId, postTest.image, postTest.text)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
        }
    )

    it('fails on empty userId', () => 
        expect(() => createPost('', postTest.image, postTest.text)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty text', () =>
        expect(() => createPost(userTest.id, postTest.image, '')).to.throw(Error, 'text is empty')
    )

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})