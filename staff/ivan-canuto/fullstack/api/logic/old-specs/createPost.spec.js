require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const createPost = require('./createPost')
const { cleanUp, generate, populate } = require('./helpers-test')

describe('createPost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)
  
    cleanUp(done)
  })

  it('Succeeds creating a new post without an existing one', done => {
    const users = [user]

    populate(users, [], error => {
      if(error) {
        done(error)

        return
      }
      
      createPost(user.id, post.image, post.text, error => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/posts.json`, (error, postJSON) => {
          expect(error).to.be.null

          const date = new Date()

          const posts = JSON.parse(postJSON)
          const DBPost = posts.find(post => post.id === 'post-1')

          expect(user).to.exist
          expect(DBPost.id).to.equal('post-1')
          expect(DBPost.author).to.equal(user.id)
          expect(DBPost.image).to.equal(post.image)
          expect(DBPost.text).to.equal(post.text)
          expect(DBPost.date).to.equal(date.toLocaleDateString())
          expect(DBPost.likes).to.be.instanceOf(Array)
          expect(DBPost.likes.length).to.equal(0)
          expect(DBPost.visible).to.equal(true)
          expect(DBPost.onSale).to.equal(null)
          expect(DBPost.comments).to.be.instanceOf(Array)
          expect(DBPost.comments.length).to.equal(0)
          
          done()
        })
      })
    })
  })

  it('Succeeds creating a new post with already one existing', done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }
      
      createPost(user.id, post.image, post.text, error => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/posts.json`, (error, postJSON) => {
          expect(error).to.be.null
          
          const date = new Date()

          const posts = JSON.parse(postJSON)
          const DBPost = posts.find(post => post.id === 'post-2')
          
          expect(user).to.exist
          expect(DBPost.id).to.equal('post-2')
          expect(DBPost.author).to.equal(user.id)
          expect(DBPost.image).to.equal(post.image)
          expect(DBPost.text).to.equal(post.text)
          expect(DBPost.date).to.equal(date.toLocaleDateString())
          expect(DBPost.likes).to.be.instanceOf(Array)
          expect(DBPost.likes.length).to.equal(0)
          expect(DBPost.visible).to.equal(true)
          expect(DBPost.onSale).to.equal(null)
          expect(DBPost.comments).to.be.instanceOf(Array)
          expect(DBPost.comments.length).to.equal(0)
          
          done()
        })
      })
    })
  })
  
  it('Fails on a non-existing user', done => {
    const users = [user]
    const posts = [post]
    
    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      const wrongId = user.id + '-wrong'

      createPost(wrongId, post.image, post.text, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost('', post.image, post.text, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {

    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost(true, post.image, post.text, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createPost([], post.image, post.text, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createPost({}, post.image, post.text, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createPost(1, post.image, post.text, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createPost(undefined, post.image, post.text, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it("Fails on image url field is empty", () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost(user.id, '', post.text, () => {})).to.throw(Error, 'The image url field is empty.')
    })
  })
  
  it("Fails on image url is not a string", () => {

    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost(user.id, true, post.text, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => createPost(user.id, [], post.text, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => createPost(user.id, {}, post.text, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => createPost(user.id, 1, post.text, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => createPost(user.id, undefined, post.text, () => {})).to.throw(Error, 'The image url is not a string.')
    })
  })
  
  it("Fails on post text field is empty", () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost(user.id, post.image, '', () => {})).to.throw(Error, 'The post text field is empty.')
    })
  })
  
  it("Fails on post text is not a string", () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null
      
      expect(() => createPost(user.id, post.image, true, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => createPost(user.id, post.image, [], () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => createPost(user.id, post.image, {}, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => createPost(user.id, post.image, 1, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => createPost(user.id, post.image, undefined, () => {})).to.throw(Error, 'The post text is not a string.')
    })
  })
  
  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => createPost(user.id, post.image, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})