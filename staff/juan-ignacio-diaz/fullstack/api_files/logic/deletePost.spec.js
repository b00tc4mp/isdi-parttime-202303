require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const deletePost = require('./deletePost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('deletePost' , () =>{
    let usersTest = []
    let postTest

    beforeEach(done => {
        usersTest = []
       
        usersTest.push(generateUser().user)
        usersTest.push(generateUser(usersTest).user)

        postTest = generatePost(usersTest[0].id).post
         
        cleanUp(error => {
            if (error) {
                done(error)

                return
            }

            populate(usersTest, [postTest], done)
        })
    })

    it('succeeds on existing user and post', done => {
        const userTest = usersTest[0]
        deletePost(userTest.id, postTest.id, error => {
            expect(error).to.be.null;
        
            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                expect(posts.length).to.equal(0);
        
                done();
            })
        })
    })

    it('fails when user not exists', done => {
        const userTestNoExistsId = usersTest[0].id+'NoExists'
        
        deletePost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })        
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTestNoExistsId = postTest.id+'NoExists'
    
        deletePost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        })               
    })

    it('fails when post doesn\'t belong to this user', done => {
        const otherUserTest = usersTest[1]
    
        deletePost(otherUserTest.id, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`Post doesn\'t belong to this user`)

            done()         
        })
    })

    it('fails on empty user id', () =>
        expect(() => deletePost('', postTest.id, () => {})).to.throw(
        Error,
        'user id is empty')
    )

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => deletePost(userTest.id, '', () => {})).to.throw(
        Error,
        'post id is empty')
    })

  after(cleanUp);

})

