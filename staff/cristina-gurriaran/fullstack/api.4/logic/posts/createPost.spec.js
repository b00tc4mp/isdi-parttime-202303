require('dotenv').config()
const { expect } = require('chai')
const { writeFile , readFile} = require ('fs')
const createPost = require('./createPost')


describe('createPost', () => {
    let userId, image, location, title, text

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
       
        userId = `id-${Math.random()}`
        image = `image-${Math.random()}`
        location = `location-${Math.random()}@mail.com`
        title = `title-${Math.random()}`
        text = `text-${Math.random()}`

    })

    it('succeeds on new post created', done => {
        const user = [{id: userId}]
        const json = JSON.stringify(user)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            createPost(userId, image, location, title, text, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null
                    const users = JSON.parse(json)
                    const user = users.find(user => user.id === userId)

                    expect(user).to.exist

                    readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
                        expect(error).to.be.null
                        const posts = JSON.parse(json)
                        const post = posts.find(post => post.author === user.id)

                        expect(post.id).to.be.a('string')
                        expect(post.image).to.equal(image)
                        expect(post.location).to.equal(location)
                        expect(post.title).to.equal(title)
                        expect(post.text).to.equal(text)
                        expect(post.date).to.be.a('string')
                        expect(post.likes).to.have.lengthOf(0)
           
                        done()
                    })
                })
            })
        })
    })

    it('fails on non-existing user', done => {
        const users = [{ userId }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            createPost(userId, image, location, title, text, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.be.equal(`user with id ${userId} not found`)

                done()
            })
        })
    })

    it('fails on empty image', () => {
        expect(() => createPost(userId, '', location, title, text, () => { })).to.throw(Error, 'image url is empty')
    })

    it('fails on non-string image', () => {
        expect(() => createPost(userId, 1, location, title, text, () => { })).to.throw(Error, 'image url is not a string')
        expect(() => createPost(userId, true, location, title, text, () => { })).to.throw(Error, 'image url is not a string')
        expect(() => createPost(userId, [], location, title, text, () => { })).to.throw(Error, 'image url is not a string')
        expect(() => createPost(userId, {}, location, title, text, () => { })).to.throw(Error, 'image url is not a string')
    })

    it('should fail on empty text', () => 
    expect(() => createPost(userId, image, location, title, '', () => { })).to.throw(Error, 'text is empty')
    )

    after(done => writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error)))
})