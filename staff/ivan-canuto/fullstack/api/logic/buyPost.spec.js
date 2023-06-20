require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const buyPost = require('./buyPost')
const { cleanUp, generate, populate } = require('./helpers-test')

describe('buyPost', () => {
  let id, onSale

  beforeEach(done => {
    id = `post-1`
    onSale = `${Math.round(Math.random * 100) + 1}`

    writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => done(error))
  })

  it('Succeeds on buying on sale post', done => {
    const post = [{id, onSale}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      buyPost(id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, postsJSON) => {
          expect(error).to.be.null
          
          const posts = JSON.parse(postsJSON)
          const post = posts.find(post => post.id === id)

          expect(post).to.exist
          expect(post.onSale).to.equal('Sold')

          done()
        })
      })
    })      
  })
  
  it('Fails on post not found', done => {
    const post = [{id, onSale}]
    const postToJSON = JSON.stringify(post)
    const wrongId = id + 'wrong'

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      buyPost(wrongId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`Post with id ${wrongId} not found.`)
      
        done()
      })
    })
  })

  it('Fails on post not on sale', done => {
    const post = [{id, onSale: null}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      buyPost(id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('This post is not on sale.')

        done()
      })
    })
  })

  it('Fails on post already sold', done => {
    const post = [{id, onSale: 'Sold'}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      buyPost(id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('This post is already sold.')

        done()
      })
    })
  })

  it(`Fails on post's id is empty`, () => {
    const post = [{id, onSale: 'Sold'}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      expect(() => buyPost('', () => { })).to.throw(Error, 'The post id field is empty.')
    })
  })

  it(`Fails on post's id is not a string`, () => {
    const post = [{id, onSale: 'Sold'}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      expect(() => buyPost(true, () => { })).to.throw(Error, 'The post id is not a string.')
      expect(() => buyPost([], () => { })).to.throw(Error, 'The post id is not a string.')
      expect(() => buyPost({}, () => { })).to.throw(Error, 'The post id is not a string.')
      expect(() => buyPost(undefined, () => { })).to.throw(Error, 'The post id is not a string.')
      expect(() => buyPost(1, () => { })).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', done => {
    const post = [{id, onSale: 'Sold'}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(() => buyPost(id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
      done()
    })
  })

  after(cleanUp)
})