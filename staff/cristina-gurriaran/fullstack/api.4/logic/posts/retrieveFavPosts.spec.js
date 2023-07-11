require('dotenv').config()
const { expect } = require('chai')
const { writeFile } = require ('fs')
const retrieveFavPosts = require ('./retrieveFavPosts')


describe('retrieveFavPosts', () => {
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

    it('succeeds on retrieving favorite posts', done => {
        const users = [{ id: userId, favs:['postId']}]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: userId, image: image, location: location, title: title, text: text, likes:likes}]
            const json = JSON.stringify(post)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                expect(error).to.be.null

                retrieveFavPosts(userId, (error, posts) => {
                    expect(error).to.be.null
                    expect(posts).to.exist

                    done()

                }) 
            })
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))

})