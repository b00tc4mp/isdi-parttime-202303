require('dotenv').config()
const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const toggleFavPost = require('./toggleFavPost')


describe('toggleLFavPost', () => {
    let userId, name, email, avatar, favs

    let postId, image, location, title, text, likes

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))

        userId = `userId-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar = null
        favs = [postId]
    })

    it('succeeds toggled fav post', done => {
        const user = [{id: userId, name, email, password, avatar, favs}]
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

                            expect(favs).to.include(postId)
            
                            done()
                    })
                    
                })
            })
        })
    })


    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))
})