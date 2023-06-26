require('dotenv').config()
const { expect } = require('chai')
const retrievePosts = require('./retrievePosts')
const { cleanUp, populate, generate } = require('./helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('./context')
const ObjectId = require('mongodb')


describe('retrievePosts', () => {
    let client

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                context.users = db.collection('users')
                context.posts = db.collection('posts')

            })
    })

    let user
    let post

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })


    it('on existing users and posts', () => {

        return context.users.insertOne(user)
            .then(() => {
                user =>
                    post = {
                        author: (user._id),
                        image: `image-${Math.random()}`,
                        text: `text-${Math.random()}`,
                        date: new Date,
                        likes: []
                    }
                        .then(() => context.posts.insertOne(post))


                        .then(() =>
                            retrievePosts(user._id))

                        .then(() => context.users.findOne({ _id: new ObjectId(user.id) }))
                        .then(user => {
                            expect(user).to.exist
                        })
                        .then(() => context.posts.findOne({ _id: new ObjectId(post.id) }))
                        .then(post => {
                            expect(post).to.exist
                        })

            })
    })
})