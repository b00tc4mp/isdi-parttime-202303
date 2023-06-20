require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const toggleLockPost = require('./toggleLockPost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('toggleLockPost' , () =>{
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

        postsTest[3].lock = true
         
        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })
debugger
    it('succeeds on update lock post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        toggleLockPost(userTest.id, postTest.id, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.lock).to.be.true

                done();
            })
        })
    })

    it('succeeds on update unlock post', done => {
        const userTest = usersTest[1]
        const postTest = postsTest[3]

        toggleLockPost(userTest.id, postTest.id, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.lock).to.be.false

                done();
            })
        })
    })

    it('fails when user not exists', done => {
        const postTest = postsTest[1]
        const userTestNoExistsId = usersTest[0].id+'NoExists'
        
        toggleLockPost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })        
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]
        const postTestNoExistsId = postTest.id+'NoExists'
    
        toggleLockPost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        })               
    })

    it('fails when post doesn\'t belong to this user', done => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]
    
        toggleLockPost(otherUserTest.id, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`Post doesn\'t belong to this user`)

            done()         
        })
    })
    
    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => toggleLockPost('', postTest.id, () => {})).to.throw(
            Error,
            'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => toggleLockPost(userTest.id, '', () => {})).to.throw(
            Error,
            'post id is empty')
    })

    after(cleanUp)
})