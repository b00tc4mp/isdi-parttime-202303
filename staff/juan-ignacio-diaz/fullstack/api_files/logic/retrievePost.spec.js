require('dotenv').config()

const { expect } = require('chai')

const retrievePost = require('./retrievePost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('retrievePost' , () =>{
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

    it('succeeds on retrieve post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        retrievePost(userTest.id, postTest.id, (error, post) => {
            expect(error).to.be.null

            expect(post).to.exist
            expect(post.id).to.be.a('string')
            expect(post.image).to.equal(postTest.image)
            expect(post.text).to.equal(postTest.text)
            expect(post.date).to.be.a('date')
            expect(post.likes).to.have.lengthOf(0)
            expect(post.lock).to.equal(false)
            expect(post.price).to.equal(0)

            done()
        })
    })


    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const userTestNoExistsId = userTest.id+'NoExists'
 
        retrievePost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })  
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const postTestNoExistsId = postTest.id+'NoExists'
    
        retrievePost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        })  
    })

    it('fails when post doesn\'t belong to this user', done => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]
    
        retrievePost(otherUserTest.id, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`Post doesn\'t belong to this user`)

            done()         
        })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => retrievePost('', postTest.id, () => {})).to.throw(
            Error,
            'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => retrievePost(userTest.id, '', () => {})).to.throw(
            Error,
            'post id is empty')
    })

    after(cleanUp)
})