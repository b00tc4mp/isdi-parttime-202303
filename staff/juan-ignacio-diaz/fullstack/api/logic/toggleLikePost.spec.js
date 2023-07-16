require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const toggleLikePost = require('./toggleLikePost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('toggleLikePost' , () =>{
    let usersTest = []
    let postsTest = []

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        usersTest = []
        postsTest = []

        usersTest.push(generateUser())
        usersTest.push(generateUser())
     
        return cleanUp()
            .then(() => Promise.all([populateUser(usersTest[0]), populateUser(usersTest[1])]))
            .then(() => {
                postsTest.push(generatePost(usersTest[0].id))
                postsTest.push(generatePost(usersTest[0].id))
        
                postsTest.push(generatePost(usersTest[1].id))
                postsTest.push(generatePost(usersTest[1].id))

                postsTest[3].likes.push(usersTest[0].id)
                postsTest[3].likes.push(usersTest[1].id)

                const promises = []
                promises.push(populatePost(postsTest[0]))
                promises.push(populatePost(postsTest[1]))
                promises.push(populatePost(postsTest[2]))
                promises.push(populatePost(postsTest[3]))

                return Promise.all(promises)
            })
    })

    it('succeeds on update like post', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[2]

        return toggleLikePost(userTest.id, postTest.id)
            .then(() => Post.findById(postTest.id))
            .then(post => {
                expect(post).to.exist
                expect(post.likes[0].toString()).to.equal(userTest.id)
            })
    })

    it('succeeds on update unlike post', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[3]

        return toggleLikePost(userTest.id, postTest.id)
            .then(() => Post.findById(postTest.id))
            .then(post => {
                expect(post).to.exist
                expect(post.likes[0].toString()).to.equal(usersTest[1].id)
            })
    })

    it('fails when user not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const userTestNoExistsId = '000000000000000000000000'
    
        return toggleLikePost(userTestNoExistsId, postTest.id)
            .catch(error => {
                expect(error).to.be.instanceOf(Error); 
                expect(error.message).to.equal('user not found')
            })  
    })
    
    it('fails when post not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const postTestNoExistsId = '000000000000000000000000'

        return toggleLikePost(userTest.id, postTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => toggleLikePost('', postTest.id)).to.throw(  Error, 'user id does not have 24 characters')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => toggleLikePost(userTest.id, '')).to.throw(Error, 'post id does not have 24 characters')
    })

    after(cleanUp)
})