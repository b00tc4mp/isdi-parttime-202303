require('dotenv').config()

const { expect } = require('chai')

const retrieveUsersPosts = require('./retrieveUsersPosts')

const { generateUser, generatePost, retrievePostsTest, cleanUp, populate } = require('./helpers/tests')

describe('retrieveUsersPosts' , () =>{
    let usersTest = []
    let postsTest = []

    beforeEach(done => {
        usersTest = []
        postsTest = []

        usersTest.push(generateUser().user)
        usersTest.push(generateUser(usersTest).user)

        postsTest.push(generatePost(usersTest[0].id).post)
        postsTest.push(generatePost(usersTest[0].id, postsTest).post)

        postsTest.push(generatePost(usersTest[1].id, postsTest).post)
        postsTest.push(generatePost(usersTest[1].id, postsTest).post)     

        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })

    it('succeeds on retrieve on sale posts', done => {
        const userTest = usersTest[0]
        const tmpPostsTest = postsTest.filter(post => post.author === userTest.id)
        const postsRetrieved = retrievePostsTest(userTest, usersTest, tmpPostsTest)

        retrieveUsersPosts(userTest.id, (error, posts) => {
            expect(error).to.be.null

            expect(posts).to.exist
            expect(posts).to.have.lengthOf(2)
            expect(posts).to.deep.equal(postsRetrieved);

            done()
        })
    })

    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const userTestNoExistsId = userTest.id+'NoExists'
    
        retrieveUsersPosts(userTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => retrieveUsersPosts('', () => {})).to.throw(
            Error,
            'user id is empty')
    })

    after(cleanUp)
})    