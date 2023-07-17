require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const retrieveSavePosts = require('./retrieveSavePosts')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('retrieveSavePosts' , () =>{
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

                postsTest[0].price = 100

                postsTest[1].lock = true

                postsTest[3].likes.push(usersTest[0].id)
                postsTest[3].likes.push(usersTest[1].id)

                const promises = []
                promises.push(populatePost(postsTest[0]))
                promises.push(populatePost(postsTest[1]))
                promises.push(populatePost(postsTest[2]))
                promises.push(populatePost(postsTest[3]))

                return Promise.all(promises)
            })
            .then(() => {
                usersTest[1].favs.push(postsTest[2].id)

                return User.findByIdAndUpdate(usersTest[1].id, { $set: { favs: usersTest[1].favs }})
            })
    })

    it('succeeds on retrieve on save posts', () => {
        const userTest = usersTest[1]
        let post, postTest

        return retrieveSavePosts(userTest.id)
            .then(posts => {
                expect(posts).to.exist
                expect(posts).to.have.lengthOf(1)

                post = posts[0]
                postTest = postsTest[2]
                expect(post.id).to.equal(postTest.id)
                expect(post.image).to.equal(postTest.image)
                expect(post.text).to.equal(postTest.text)
                expect(post.author.id).to.equal(postTest.author)
                expect(post.likes).to.have.lengthOf(0)
                expect(post.lock).to.equal(false)
                expect(post.price).to.equal(0)   
            })
    })

    it('fails when user not exists', () => {
        const userTestNoExistsId = '000000000000000000000000'

        return retrieveSavePosts(userTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on empty user id', () => 
        expect(() => retrieveSavePosts('')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})    