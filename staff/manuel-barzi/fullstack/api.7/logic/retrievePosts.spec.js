require('dotenv').config()

const { expect } = require('chai')
const retrievePosts = require('./retrievePosts')
const { cleanUp, populate, generate } = require('./helpers/tests')


describe('retrievePosts', () => {
    //beforeEach(done => cleanUp(done))
    beforeEach(cleanUp)

    describe('on existing users and posts', () => {
        const users = new Array(5), posts = []

        beforeEach(done => {
            for (let i = 0; i < users.length; i++) {
                const user = generate.user()

                users[i] = user

                for (let j = 0; j < 5; j++) {
                    const post = generate.post(user.id)

                    posts.push(post)
                }
            }

            populate(users, posts, done)
        })

        it('succeeds', done => {
            const user = users[0]

            retrievePosts(user.id, (error, posts2) => {
                expect(error).to.be.null

                //expect(JSON.stringify(posts.reverse())).to.equal(JSON.stringify(posts2))
                expect(posts2).to.deep.equal(posts.reverse())

                done()
            })
        })

        // ...
    })

    //after(done => cleanUp(done))
    after(cleanUp)
})