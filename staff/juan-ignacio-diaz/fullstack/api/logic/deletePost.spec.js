require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const deletePost = require('./deletePost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('deletePost' , () =>{
    let usersTest = []
    let postTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        usersTest = []
       
        usersTest.push(generateUser())
        usersTest.push(generateUser())

        postTest = generatePost(usersTest[0].id).post
         
        return cleanUp()
            .then(() => Promise.all([populateUser(usersTest[0]), populateUser(usersTest[1])]))
            .then(() => {
                postTest = generatePost(usersTest[0].id)
            
                return populatePost(postTest)
            })
    })

    it('succeeds on existing user and post', () => {
        const userTest = usersTest[0]

        return deletePost(userTest.id, postTest.id)
            .then(() => Post.find({}))
            .then(posts => {
                expect(posts.length).to.equal(0)
            })
    })

    it('fails when user not exists', () => {
        const userTestNoExistsId = '000000000000000000000000'
    
        return deletePost(userTestNoExistsId, postTest.id)
            .catch(error => {
                expect(error).to.be.instanceOf(Error); 
                expect(error.message).to.equal('user not found')
            })  
})
    
    it('fails when post not exists', () => {
        const userTest = usersTest[0]
        const postTestNoExistsId = '000000000000000000000000'

        return deletePost(userTest.id, postTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails when post doesn\'t belong to this user', () => {
        const otherUserTest = usersTest[1]
    
        return deletePost(otherUserTest.id, postTest.id)
            .catch(error => {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal(`Post doesn\'t belong to this user`)
            })
    })

    it('fails on empty user id', () =>
        expect(() => deletePost('', postTest.id)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => deletePost(userTest.id, '')).to.throw(Error, 'post id does not have 24 characters')
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})

