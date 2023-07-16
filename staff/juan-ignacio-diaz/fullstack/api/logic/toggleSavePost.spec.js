require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const toggleSavePost = require('./toggleSavePost')

const { generateUser, generatePost, cleanUp, populateUser, populatePost } = require('./helpers/tests')

describe('toggleSavePost' , () =>{
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
            .then(() => {
                usersTest[1].favs.push(postsTest[2].id)

                return User.findByIdAndUpdate(usersTest[1].id, { $set: { favs: usersTest[1].favs }})
            })
    })

    it('succeeds on update save post', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[2]

        return toggleSavePost(userTest.id, postTest.id)
            .then(() => User.findById(userTest.id))
            .then(user => {
                expect(user).to.exist
                expect(user.favs[0].toString()).to.equal(postTest.id)
            })
    })

    it('succeeds on update unsave post', () => {
        const userTest = usersTest[1]
        const postTest = postsTest[2]

        return toggleSavePost(userTest.id, postTest.id)
            .then(() => User.findById(userTest.id))
            .then(user => {
                expect(user).to.exist
                expect(user.favs.length).to.equal(0);
            })
    })


    it('fails when user not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const userTestNoExistsId = '000000000000000000000000'
    
        return toggleSavePost(userTestNoExistsId, postTest.id)
            .catch(error => {
                expect(error).to.be.instanceOf(Error); 
                expect(error.message).to.equal('user not found')
            })  
    })
    
    it('fails when post not exists', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const postTestNoExistsId = '000000000000000000000000'

        return toggleSavePost(userTest.id, postTestNoExistsId)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('post not found')
            })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => toggleSavePost('', postTest.id)).to.throw(Error, 'user id does not have 24 characters')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => toggleSavePost(userTest.id, '')).to.throw(Error, 'post id does not have 24 characters')
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})