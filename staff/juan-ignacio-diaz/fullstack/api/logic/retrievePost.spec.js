require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const retrievePost = require('./retrievePost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('retrievePost' , () =>{
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

                const promises = []
                promises.push(populatePost(postsTest[0]))
                promises.push(populatePost(postsTest[1]))
                promises.push(populatePost(postsTest[2]))
                promises.push(populatePost(postsTest[3]))

                return Promise.all(promises)
            })
    })

    it('succeeds on retrieve post', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        return retrievePost(userTest.id, postTest.id)
            .then(post => {
                expect(post).to.exist
                expect(post.image).to.equal(postTest.image)
                expect(post.text).to.equal(postTest.text)
                expect(post.price).to.equal(0)
            })
    })


    it('fails when user not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const userTestNoExistsId = '000000000000000000000000'
    
        return retrievePost(userTestNoExistsId, postTest.id)
            .catch(error => {
                expect(error).to.be.instanceOf(Error); 
                expect(error.message).to.equal('user not found')
            })  
    })
    
    it('fails when post not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const postTestNoExistsId = '000000000000000000000000'

        return retrievePost(userTest.id, postTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails when post doesn\'t belong to this user', () => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]
    
        retrievePost(otherUserTest.id, postTest.id,)
            .catch(error => {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal(`Post doesn\'t belong to this user`)
            })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => retrievePost('', postTest.id)).to.throw(Error, 'user id does not have 24 characters')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => retrievePost(userTest.id, '')).to.throw(Error, 'post id does not have 24 characters')
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})