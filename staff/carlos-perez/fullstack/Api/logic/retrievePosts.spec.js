const { expect } = require('chai')
const { writeFile, readFile } = require ('fs')
const retrievePosts = require('./retrievePosts')


describe('retrievePosts', () => {
    let userId, postId, image, location, title, text, likes

    beforeEach(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
       
        userId = `userId-${Math.random()}`
        postId = `postIdd-${Math.random()}`
        image = `image-${Math.random()}`
        location = `location-${Math.random()}@mail.com`
        title = `title-${Math.random()}`
        text = `text-${Math.random()}`
        likes =[]

    })

    it('succeeds on retrieving post', done => {
        const users = [{ id: userId, author: userId, favs: [postId]}]
        let json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null
            
                const users = JSON.parse(json)
                const user = users.find(user => user.id === userId )
                
                const post = [{id: postId, author: userId, image: image, location: location, title: title, text: text, likes:likes}]
                json = JSON.stringify(post)

                writeFile('./data/posts.json', json, 'utf8', error => {
                    expect(error).to.be.null

                    retrievePosts(user.id, (error, posts) => {
                        expect(error).to.be.null
                        expect(posts).to.exist
                        expect(posts).to.have.lengthOf(1)

                        done()

                    })
                    
                })
            })
        })
    })

    after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))

})