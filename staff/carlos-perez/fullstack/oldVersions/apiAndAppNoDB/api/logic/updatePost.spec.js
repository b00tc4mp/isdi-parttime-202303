const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const updatePost = require('./updatePost')


describe('updatePost', () => {
    let userId, postId, image, text, likes

    beforeEach(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
       
        userId = `userId-${Math.random()}`
        postId = `postIdd-${Math.random()}`
        image = `image-${Math.random()}`
        text = `text-${Math.random()}`
        likes =[]

    })

    it('succeeds on new post created', done => {
        const user = [{id: userId}]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: userId, image: image, text: text, likes:likes}]
            const json = JSON.stringify(post)

            writeFile('./data/posts.json', json, 'utf8', error => {
                expect(error).to.be.null

                updatePost(userId, postId, image, text, error => {
                    expect(error).to.be.null

                    readFile('./data/users.json', 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const users = JSON.parse(json)
                        const user = users.find(user => user.id === userId)

                        expect(user).to.exist

                        readFile('./data/posts.json', 'utf8', (error, json) => {
                            expect(error).to.be.null
                            const posts = JSON.parse(json)
                            const post = posts.find(post => post.id === postId)

                            expect(post).to.exist

                            expect(post.id).to.be.a('string')
                            expect(post.image).to.equal(image)
                            expect(post.text).to.equal(text)
                            expect(post.date).to.be.a('string')
                            expect(post.likes).to.have.lengthOf(0)
            
                            done()
                        })
                    })
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        const users = [{ userId }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            updatePost(userId, postId, image, text, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.be.equal(`user with id ${userId} not found`)

                done()
            })
        })
    })
    after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))
})