const { expect } = require('chai')
const { writeFile , readFile } = require ('fs')
const deletePost = require('./deletePost')


describe('delete', () => {
    let userId, postId

    beforeEach(done => {
        writeFile('./data/posts.json', '[]', 'utf8', error => done(error))
       
        userId = `userId-${Math.random()}`
        postId = `postId-${Math.random()}`
    })

    it('succeeds on post deleted', done => {
        const user = [{id: userId}]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            const post = [{id: postId}]
            const json = JSON.stringify(post)

            writeFile('./data/posts.json', json, 'utf8', error => {
                expect(error).to.be.null

                deletePost(userId,postId, error => {
                    expect(error).to.be.null

                    readFile('./data/users.json', 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const users = JSON.parse(json)
                        const user = users.find(user => user.id === userId)

                        expect(user).to.exist

                        readFile('./data/posts.json', 'utf8', (error, json) => {
                            expect(error).to.be.null
                            const posts = JSON.parse(json)
                            const post = posts.find(post => post.id !== postId)

                            done()
                        })
                    })
                })
            })
        })
    })
    
    after(done => writeFile('./data/posts.json', '[]', 'utf8', error => done(error)))
})

