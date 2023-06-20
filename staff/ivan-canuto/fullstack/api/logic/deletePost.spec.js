require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const deletePost = require('./deletePost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('deletePost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('Succeeds on deleting an existing post', done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }
        
      readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
        expect(error).to.be.null

        const posts1 = JSON.parse(json)
        const DBPost = posts1.find(_post => _post.id === post.id)

        expect(DBPost).to.exist
        expect(posts1.length).to.equal(1)
        
        deletePost(post.id, user.id, error => {
          expect(error).to.be.null
          
          readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            expect(error).to.be.null
            
            const posts2 = JSON.parse(json)
            
            expect(posts2.length).to.equal(0)
            
            done()
          })
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

      deletePost(wrongPostId, user.id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
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
      
      deletePost(post.id, wrongUserId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
      })
    })
  })

  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deletePost('', user.id, () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deletePost(true, user.id, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => deletePost([], user.id, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => deletePost({}, user.id, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => deletePost(1, user.id, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => deletePost(undefined, user.id, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })
  
  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deletePost(post.id, '', () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deletePost(post.id, true, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => deletePost(post.id, [], () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => deletePost(post.id, {}, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => deletePost(post.id, 1, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => deletePost(post.id, undefined, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => deletePost(post.id, user.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})