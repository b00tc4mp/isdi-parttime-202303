require('dotenv').config()
const { expect } = require('chai')
const { writeFile, readFile } = require ('fs')
const retrievePost = require('./retrievePost.js')


describe('retrievePost', () => {
    let userId, postId, image, location, title, text, likes

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
       
        userId = `userId-${Math.random()}`
        postId = `postIdd-${Math.random()}`
        image = `image-${Math.random()}`
        location = `location-${Math.random()}@mail.com`
        title = `title-${Math.random()}`
        text = `text-${Math.random()}`
        likes =[]

    })

    it('succeeds on retrieving post', done => {
        const users = [{ id: userId}]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: userId, image: image, location: location, title: title, text: text, likes:likes}]
            const json = JSON.stringify(post)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                expect(error).to.be.null

                retrievePost(userId, postId, (error, post) => {
                    expect(error).to.be.null
                    expect(post).to.exist
                    expect(post.id).to.equal(postId)

                    done()

                })
                
            })
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))

})