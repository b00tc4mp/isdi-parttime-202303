const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const toggleLikePost = require('./toggleLikePost')


describe('toggleLikePost', () => {
    let userId, postId, image, text, likes

    beforeEach(done => {
        userId = `userId-${Math.random()}`
        postId = `postIdd-${Math.random()}`
        image = `image-${Math.random()}`
        text = `text-${Math.random()}`
        likes =[]
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('succeeds toggled like post', done => {
        const user = [{id: userId}]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: userId, image: image, text: text, likes: [userId]}]
            const json = JSON.stringify(post)

            writeFile('./data/posts.json', json, 'utf8', error => {
                expect(error).to.be.null

                toggleLikePost(userId, postId, error => {
                    expect(error).to.be.null

                    readFile('./data/posts.json', 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const posts = JSON.parse(json)
                        const post = posts.find(post => post.id === postId)

                            expect(post).to.exist

                            expect(post.id).to.be.a('string')
                            expect(post.likes[0]).to.equal(userId)
                            expect(post.likes).to.have.lengthOf(1)
            
                            done()
                    })
                    
                })
            })
        })
    })


    after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))
})