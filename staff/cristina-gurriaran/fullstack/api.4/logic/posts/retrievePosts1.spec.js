require('dotenv').config()
const { expect } = require('chai')
const retrievePosts = require('./retrievePosts')
const {cleanUp, generate, populate} = require('../helpers/tests')

describe('retrievePosts', () => {
    beforeEach(cleanUp)

    describe('on existing users and posts', () => {
        const users = new Array(5)
        const posts = []

        beforeEach(done => {
            for (let i = 0; i < users.length; i++ ){
                const user = generate.user()
                
                users[i] = user

                for (let j = 0; j < posts.length; j++){
                    const post = generate.post(user.id)
                    posts.push(post)
                }

            }

            populate(users, posts, done)
        })

        it('succeeds on retrieving posts', done => {
            const user = users[0]

            retrievePosts(user.id, (error, posts2) => {
                expect(posts2).to.deep.equal(posts.reverse())

                done()
            })
        })
    })

    after(cleanUp)
})


