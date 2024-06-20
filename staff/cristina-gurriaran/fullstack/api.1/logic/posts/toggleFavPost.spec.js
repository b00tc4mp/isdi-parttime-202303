require('dotenv').config()
const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const toggleFavPost = require('./toggleFavPost')


describe('toggleLFavPost', () => {
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

    it('succeeds toggled fav post', done => {
        const user = [{id: userId, favs:[postId]}]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null
            
            const post = [{id: postId, author: userId, image: image, location: location, title: title, text: text, likes:likes}]
            const json = JSON.stringify(post)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, 'utf8', error => {
                expect(error).to.be.null

                toggleFavPost(userId, postId, error => {
                    expect(error).to.be.null

                    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const users = JSON.parse(json)
                        const user = users.find(user => user.id === userId)

                            expect(user).to.exist

                            expect(user.id).to.be.a('string')
                            expect(user.favs[0]).to.equal(postId)
                            expect(user.favs).to.have.lengthOf(1)
            
                            done()
                    })
                    
                })
            })
        })
    })


    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))
})