require('dotenv').config()
const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const toggleLikePost = require('./toggleLikePost')


describe('toggleLikePost', () => {
    let userId, postId, image, location, title, text, likes

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))

        userId = `userId-${Math.random()}`

        postId = `postIdd-${Math.random()}`
        author = `userId-${Math.random()}`
        image = `image-${Math.random()}`
        location = `location-${Math.random()}@mail.com`
        title = `title-${Math.random()}`
        text = `text-${Math.random()}`
        likes = [userId]

    })

    it('succeeds toggled like post', done => {
        const user = [{ id: userId }]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: author, image: image, location: location, title: title, text: text, likes: [userId]}]
            const json = JSON.stringify(post)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                expect(error).to.be.null

                toggleLikePost(userId, postId, error => {
                    expect(error).to.be.null

                    readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const posts = JSON.parse(json)
                        const post = posts.find(post => post.id === postId)

                        expect(likes).to.include(userId)

            
                        done()
                    })
                    
                })
            })
        })
    })


    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))
})