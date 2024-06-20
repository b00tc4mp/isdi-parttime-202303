require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { Post } = require('../data/models')

const updatePost = require('./updatePost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('updatePost' , () =>{
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

    it('succeeds on update post', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        return updatePost(userTest.id, postTest.id, image, text)
            .then(() => Post.findById(postTest.id))
            .then(post => {
                expect(post).to.exist
                expect(post.image).to.equal(image)
                expect(post.text).to.equal(text)
                expect(new Date(post.dateLastModified)).to.be.a('date')
            })
    })


    it('fails when user not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'
        const userTestNoExistsId = '000000000000000000000000'
    
        return updatePost(userTestNoExistsId, postTest.id, image, text)
            .catch(error => {
                expect(error).to.be.instanceOf(Error); 
                expect(error.message).to.equal('user not found')
            }) 
    })
    
    it('fails when post not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'
        const postTestNoExistsId = '000000000000000000000000'

        return updatePost(userTest.id, postTestNoExistsId, image, text)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails when post doesn\'t belong to this user', () => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        return updatePost(otherUserTest.id, postTest.id, image, text)
            .catch(error => {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal(`Post doesn\'t belong to this user`)
            })      
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        expect(() => updatePost('', postTest.id, image, text)).to.throw(Error, 'user id does not have 24 characters')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        expect(() => updatePost(userTest.id, '', image, text)).to.throw(Error, 'post id does not have 24 characters')
    })

    it('fails on invalid post image', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = ()=>{}
        const text = postTest.text+'New'

        expect(() => updatePost(userTest.id, postTest.id, image, text)).to.throw(Error, `url is not a string`)
    })

    it('fails on invalid post text', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = ()=>{}

        expect(() => updatePost(userTest.id, postTest.id, image, text)).to.throw(Error, `text is not a string`)
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})