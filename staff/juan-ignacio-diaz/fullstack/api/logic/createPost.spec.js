require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')

const createPost = require('./createPost')

const RandomUser = require('./helpers/ui_userTest')
const RandomPost = require('./helpers/ui_postTest')

describe('createPost' , () =>{
    let userTest

    beforeEach(done => {
        userTest = RandomUser()
        postTest = RandomPost(userTest.id)

        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => {
            writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error))
        })
        
    })

    it('succeeds on new post', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password }]

        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {

            createPost(userTest.id, postTest.image, postTest.text, error => {
                expect(error).to.be.null
                
                readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null

                    const posts =JSON.parse(json)

                    const post =posts[0]

                    expect(post).to.exist
                    expect(post.id).to.be.a('string')
                    expect(post.image).to.equal(postTest.image)
                    expect(post.text).to.equal(postTest.text)
                    expect(new Date(post.date)).to.be.a('date')
                    expect(post.likes).to.have.lengthOf(0)
                    expect(post.lock).to.equal(false)
                    expect(post.price).to.equal(0)

                    done()
                })
            })
        })
    })


    it('fails on existing user', done => {
        const users = [{ id: userTest.id, name: userTest.name, email: userTest.email, password: userTest.password }]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            const userIdInvalid = userTest.id + '-invalid'
            createPost(userIdInvalid, postTest.image, postTest.text, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userIdInvalid} not found`)

                done()
            })
        })
    })

    it('fails on empty userId', () => {
        expect(() => createPost('', postTest.image, postTest.text, () => { })).to.throw(Error, 'user id is empty')
    })

    it('fails on empty text', () =>
        expect(() => createPost(userTest.id, postTest.image, '', () => { })).to.throw(Error, 'text is empty')
    )

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error =>  
        writeFile(`${process.env.DB_PATH}/posts.json`, '[]', 'utf8', error => done(error))
    ))
})