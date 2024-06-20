require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const toggleSavePost = require('./toggleSavePost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('toggleSavePost' , () =>{
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

        usersTest[1].favs.push(postsTest[2].id)
         
        cleanUp(error => {
            if(error) {
                done(error)

                return
            }

            populate(usersTest, postsTest, done)
        })
    })

    it('succeeds on update save post', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[2]

        toggleSavePost(userTest.id, postTest.id, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                expect(error).to.be.null;
        
                const users = JSON.parse(json);
        
                const user = users.find(user => user.id === userTest.id)

                expect(user).to.exist
                expect(user.favs[0]).to.equal(postTest.id)

                done();
            })
        })
    })

    it('succeeds on update unsave post', done => {
        const userTest = usersTest[1]
        const postTest = postsTest[2]

        toggleSavePost(userTest.id, postTest.id, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
                expect(error).to.be.null;
        
                const users = JSON.parse(json);
        
                const user = users.find(user => user.id === userTest.id)

                expect(user).to.exist
                expect(user.favs.length).to.equal(0);

                done();
            })
        })
    })


    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const userTestNoExistsId = userTest.id+'NoExists'
    
        toggleSavePost(userTestNoExistsId, postTest.id, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })  
    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const postTestNoExistsId = postTest.id+'NoExists'
    
        toggleSavePost(userTest.id, postTestNoExistsId, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        }) 
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        expect(() => toggleSavePost('', postTest.id, () => {})).to.throw(
            Error,
            'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]

        expect(() => toggleSavePost(userTest.id, '', () => {})).to.throw(
            Error,
            'post id is empty')
    })

    after(cleanUp)
})