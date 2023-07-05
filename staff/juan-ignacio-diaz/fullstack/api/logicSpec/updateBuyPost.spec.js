require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const updateBuyPost = require('./updateBuyPost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('updateBuyPost' , () =>{
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

        postsTest[2].price = '100'
         
        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })

    it('succeeds on update buy post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[2]

        updateBuyPost(userTest.id, postTest.id, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                expect(posts.length).to.equal(4);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.author).to.equal(userTest.id)
                expect(post.price).to.equal(0)

                done();
            })
        })
    })


    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const userTestNoExistsId = userTest.id+'NoExists'
    
        updateBuyPost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })  
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const postTestNoExistsId = postTest.id+'NoExists'
    
        updateBuyPost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        }) 
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => updateBuyPost('', postTest.id, () => {})).to.throw(
            Error, 'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => updateBuyPost(userTest.id, '', () => {})).to.throw(
            Error, 'post id is empty')
    })

    after(cleanUp)
})