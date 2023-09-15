require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const toggleVisibilityPost = require('./toggleVisibilityPost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('toggleVisibilityPost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it("Succeeds on setting a public post as private (not visible)", done => {
    const users = [user]
    const posts = [post]
    
    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      toggleVisibilityPost(post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null
          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.visible).to.be.false

          done()
        })
      })
    })
  })
  
  it("Succeeds on setting a private post as public (visible)", done => {
    const users = [user]

    post.visible = false
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      toggleVisibilityPost(post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.visible).to.be.true

          done()
        })
      })
    })
  })

  it('Fails on post not found', done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }
        
      const wrongPostId = post.id + '-wrong'

      toggleVisibilityPost(wrongPostId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
      })
    })
  })

  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleVisibilityPost('', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleVisibilityPost(true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleVisibilityPost([], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleVisibilityPost({}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleVisibilityPost(1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleVisibilityPost(undefined, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => toggleVisibilityPost(post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})