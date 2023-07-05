require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const toggleLikePost = require('./toggleLikePost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('toggleLikePost' , () =>{
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

        postsTest[3].likes.push(usersTest[0].id)
        postsTest[3].likes.push(usersTest[1].id)
         
        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })

    it('succeeds on update like post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[2]

        toggleLikePost(userTest.id, postTest.id, (error, post) => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.likes[0]).to.equal(userTest.id)

                done();
            })
        })
    })

    it('succeeds on update unlike post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[3]

        toggleLikePost(userTest.id, postTest.id, (error, post) => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.likes[0]).to.equal(usersTest[1].id)

                done();
            })
        })
    })

    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const userTestNoExistsId = userTest.id+'NoExists'
    
        toggleLikePost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })  
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const postTestNoExistsId = postTest.id+'NoExists'
    
        toggleLikePost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        }) 
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => toggleLikePost('', postTest.id, () => {})).to.throw(  Error, 'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => toggleLikePost(userTest.id, '', () => {})).to.throw(Error, 'post id is empty')
    })

    after(cleanUp)
})