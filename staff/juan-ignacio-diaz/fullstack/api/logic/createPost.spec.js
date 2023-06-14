require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')

const createPost = require('./createPost')

const { generateUser, cleanUp, populate } = require('./helpers/tests')

describe('createPost' , () =>{
    let userTest, postTest, countId

    beforeEach(done => {
        userTest = generateUser()
         
        cleanUp(done)
    })

    it('succeeds on new post', done => {
        populate([userTest], [], error => {
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
        populate([userTest], [], error => {
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

    after(cleanUp)

})