require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const toggleLikePost = require('./toggleLikePost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('toggleLikePost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it("Succeeds in liking a post that the user hasn't liked before", done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      toggleLikePost(user.id, post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.likes).to.have.lengthOf(1)
          expect(DBPost.likes[0]).to.equal(user.id)

          done()
        })
      })
    })
  })
  
  it("Succeeds in unliking a post that the user has liked before", done => {
    const users = [user]

    post.likes = [user.id]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      toggleLikePost(user.id, post.id, error => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null
          
          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.likes).to.have.lengthOf(0)

          done()
        })
      })
    })
  })

  it('Fails on user not found', done => {
    const users = [user]
    const posts = [post]
    
    populate(users, posts, error => {
      if(error) {
        done(error)
        
        return
      }
      
      const wrongUserId = user.id + '-wrong'
      
      toggleLikePost(wrongUserId, post.id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
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

      toggleLikePost(user.id, wrongPostId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleLikePost('', post.id, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleLikePost(true, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleLikePost([], post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleLikePost({}, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleLikePost(1, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleLikePost(undefined, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleLikePost(user.id, '', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleLikePost(user.id, true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleLikePost(user.id, [], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleLikePost(user.id, {}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleLikePost(user.id, 1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleLikePost(user.id, undefined, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => toggleLikePost(user.id, post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})