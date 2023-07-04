require('dotenv').config()

const { expect } = require('chai')
const createPost = require('./createPost')
const { generate, cleanUp, populate } = require('./helpers/tests')

debugger

describe('createPost', () => {
    let user
    let post
    beforeEach(done => {
        user = generate.user()
        post = generate.post()

        cleanUp(done)
    })


    it('SUCCEEDS when user ID exists and post fields filled', done => {
        const posts = [post]
        const users = [user]


        populate(users, posts, error => {
            if (error) {
                done(error)

                return
            }

            createPost(user.id, post.text, post.image, (error) => {
                expect(error).to.be.null
                expect(user.id).to.equal(user.id)

                done()
            })
        })
    })

    // after(cleanUp)
})
// to run the test run "node logic/registerUser.js"