require('dotenv').config()

const { expect } = require('chai')
const { readFile } = require('fs')

const updatePost = require('./updatePost')

const { generateUser, generatePost, cleanUp, populate } = require('./helpers/tests')

describe('updatePost' , () =>{
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

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        updatePost(userTest.id, postTest.id, image, text, error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
                expect(error).to.be.null;
        
                const posts = JSON.parse(json);
        
                expect(posts.length).to.equal(4);
        
                const post = posts.find(post => post.id === postTest.id)

                expect(post).to.exist
                expect(post.image).to.equal(image)
                expect(post.text).to.equal(text)
                expect(new Date(post.dateLastModified)).to.be.a('date')

                done();
            })
        })
    })


    it('fails when user not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'
        const userTestNoExistsId = userTest.id+'NoExists'
    
        updatePost(userTestNoExistsId, postTest.id, image, text, error => {
            expect(error).to.be.instanceOf(Error);
        
            expect(error.message).to.equal(`user with id ${userTestNoExistsId} not found`)

            done()
        })  

    })
    
    it('fails when post not exists', done => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'
        const postTestNoExistsId = postTest.id+'NoExists'

        updatePost(userTest.id, postTestNoExistsId, image, text, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`post with id ${postTestNoExistsId} not found`)

            done()
        })       
    })

    it('fails when post doesn\'t belong to this user', done => {
        const postTest = postsTest[0]
        const otherUserTest = usersTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        updatePost(otherUserTest.id, postTest.id, image, text, error => {
            expect(error).to.be.instanceOf(Error);

            expect(error.message).to.equal(`Post doesn\'t belong to this user`)

            done()         
        })        
    })

    it('fails on empty user id', () => {
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        expect(() => updatePost('', postTest.id, image, text, () => {})).to.throw(Error, 'user id is empty')
    })

    it('fails on empty post id', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = postTest.text+'New'

        expect(() => updatePost(userTest.id, '', image, text, () => {})).to.throw(Error, 'post id is empty')
    })

    it('fails on invalid post image', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = ()=>{}
        const text = postTest.text+'New'

        expect(() => updatePost(userTest.id, postTest.id, image, text, () => {})).to.throw(Error, `url is not a string`)
    })

    it('fails on invalid post text', () => {
        const userTest = usersTest[0]
        const postTest = postsTest[1]

        const image = postTest.image+'New'
        const text = ()=>{}

        expect(() => updatePost(userTest.id, postTest.id, image, text, () => {})).to.throw(Error, `text is not a string`)
    })

    after(cleanUp)
})