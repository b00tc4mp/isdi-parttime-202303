require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const updatePriceToPost = require('./updatePriceToPost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('updatePriceToPost' , () =>{
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

    it('succeeds on update post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const price = 100

        updatePriceToPost(userTest.id, postTest.id, price, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                expect(posts.length).to.equal(4);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.price).to.equal(price)

                done();
            })
        })
    })


    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const price = 100
        const userTestNoExistsId = userTest.id+'NoExists'
    
        updatePriceToPost(userTestNoExistsId, postTest.id, price, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        }) 
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const price = 100
        const postTestNoExistsId = postTest.id+'NoExists'
    
        updatePriceToPost(userTest.id, postTestNoExistsId, price, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        }) 
    })

    it('fails when post doesn\'t belong to this user', done => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]

        const price = 100
    
        updatePriceToPost(otherUserTest.id, postTest.id,  price, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`Post doesn\'t belong to this user`)

            done()         
        })
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        const price = 100

        expect(() => updatePriceToPost('', postTest.id, price, () => {})).to.throw(
            Error,
            'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        const price = 100

        expect(() => updatePriceToPost(userTest.id, '', price, () => {})).to.throw(
            Error,
            'post id is empty')
    })

    it('fails on invalid post price', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const price = 'NoPrice'

        expect(() => updatePriceToPost(userTest.id, postTest.id, price, () => {})).to.throw(
            Error,
            `number is not a number`)
    })

    after(cleanUp)
})