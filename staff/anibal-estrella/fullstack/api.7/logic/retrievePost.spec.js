require('dotenv').config()

const { expect } = require('chai')
const retrievePost = require('./retrievePost')
const { cleanUp, populate, generate } = require('./helpers/tests')

describe('retrievePost', () => {
    let user, post

    beforeEach(done => {
        user = generate.user()
        post = generate.post(user.Id)


        cleanUp(done)
    })

    it('Succeeds on existing user and post', (done) => {
        const users = [user], posts = [post]
        populate(users, posts, (error) => {
            if (error) {
                done(error)

                return
            }

            retrievePost(user.id, post.id, (error, _post) => {
                expect(error).to.be.null

                _post.date = new Date(_post.date) // Convert _post.date to a Date object

                expect(_post).to.exist
                expect(_post.id).to.be.equal(post.id)
                expect(_post.author).to.be.equal(post.author)
                expect(_post.image).to.be.equal(post.image)
                expect(_post.text).to.be.equal(post.text)
                // expect(_post.date).to.deep.equal(post.date)
                expect(_post.date).to.deep.equal(post.date);

                done()

            })

        })

    })

    it('FAILS on non-existing post', (done) => {
        const users = [user]

        populate(users, [], (error) => {
            if (error) {
                done(error)

                return
            }


            retrievePost(user.id, post.id, (error, _post) => {
                expect(error).to.be.instanceOf(Error)

                expect(_post).to.be.undefined
                expect(error.message).to.be.equal(`Post not found in DB! 👎`)

                done()

            })
        })
    })

    it('FAILS on non-existing user', (done) => {
        retrievePost(user.id, post.id, (error, _post) => {
            expect(error).to.be.instanceOf(Error)

            expect(error.message).to.be.equal(`User not found in the DB! 👎`)
            expect(_post).to.be.undefined

            done()
        })
    })

    it('FAILS on non-string id', () => {
        // `${explain} is ${typeof id} and must be a string`

        expect(() => retrievePost(user.id, undefined, () => { })).to.throw(Error, `post id is undefined and must be a string`)
        expect(() => retrievePost(user.id, 1, () => { })).to.throw(Error, `post id is number and must be a string`)
        expect(() => retrievePost(user.id, null, () => { })).to.throw(Error, `post id is object and must be a string`)
        expect(() => retrievePost(user.id, true, () => { })).to.throw(Error, `post id is boolean and must be a string`)
        expect(() => retrievePost(user.id, false, () => { })).to.throw(Error, `post id is boolean and must be a string`)
        expect(() => retrievePost(user.id, {}, () => { })).to.throw(Error, `post id is object and must be a string`)
        expect(() => retrievePost(user.id, [], () => { })).to.throw(Error, `post id is object and must be a string`)
    })

    it('FAILS on non callback', () => {
        expect(() => retrievePost(user.id, post.id)).to.throw(Error, 'callback function must be a function')
    })


    after(cleanUp)

})
