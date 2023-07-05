require('dotenv').config()

const { expect } = require('chai')

const retrieveSavePosts = require('./retrieveSavePosts')

const { generateUser, generatePost, retrievePostsTest, cleanUp, populate } = require('./helpers/tests')

describe('retrieveSavePosts' , () =>{
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

        usersTest[0].favs.push(postsTest[2].id)

        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })

    it('succeeds on retrieve on save posts', done => {
        const userTest = usersTest[0]
        const postsRetrieved = retrievePostsTest(userTest, usersTest, [postsTest[2]])

        retrieveSavePosts(userTest.id, (error, posts) => {
            expect(error).to.be.null

            expect(posts).to.exist
            expect(posts).to.have.lengthOf(1)
            expect(posts).to.deep.equal(postsRetrieved);

            done()
        })
    })

    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const userTestNoExistsId = userTest.id+'NoExists'
    
        retrieveSavePosts(userTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => retrieveSavePosts('', () => {})).to.throw(
            Error,
            'user id is empty')
    })

    after(cleanUp)
})    