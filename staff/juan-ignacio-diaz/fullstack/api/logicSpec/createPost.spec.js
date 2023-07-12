require('dotenv').config()

const { expect } = require('chai')
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const createPost = require('./createPost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('createPost' , () =>{
    let db
    let userTest, postTest

    before(() => {
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            db = mongoose.connection
        })
    })

    beforeEach(done => {
        userTest = generateUser()
         
        cleanUp(done)
    })

    it('succeeds on new post', done => {
        return populateUser(userTest)
            .then(() => createPost(userTest.id, postTest.image, postTest.text))
            .then(() => Post.findOne({ })
            .then(post => {
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

    it('succeeds if there are existing posts', (done) => {
        let postTest, postTest2
        return populateUser(userTest)
            .then(user => {
                postTest = generatePost(user.id)
                postTest2 = generatePost(user.id)

                populatePost(postTest)
            })              
            .then(post => createPost(userTest.id, postTest.image, postTest.text))
            .then(() => Post.findOne({ })
            .then(
                expect(post).to.exist
                expect(posts.length).to.equal(2)


            })
        })

    

    it('fails on existing user', done => {
        populate([userTest], [], error => {
            expect(error).to.be.null

            const userIdInvalid = userTest.id + '-invalid'
            createPost(userIdInvalid, postTest.image, postTest.text, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userIdInvalid} not found`)

                done()
            })
        })
    })

    it('fails on empty userId', () => {
        expect(() => createPost('', postTest.image, postTest.text, () => { })).to.throw(Error, 'user id is empty')
    })

    it('fails on empty text', () =>
        expect(() => createPost(userTest.id, postTest.image, '', () => { })).to.throw(Error, 'text is empty')
    )

    after(cleanUp)

})