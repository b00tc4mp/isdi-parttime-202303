require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const unsetPostPrice = require('./unsetPostPrice')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('unsetPostPrice', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it("Succeeds on removing post price and the post from sale", done => {
    const users = [user]

    post.onSale = '999'
    const posts = [post]
    
    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      unsetPostPrice(post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.onSale).to.be.null
          
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
      
      unsetPostPrice(wrongPostId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
      })
    })
  })

  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => unsetPostPrice('', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => unsetPostPrice(true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => unsetPostPrice([], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => unsetPostPrice({}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => unsetPostPrice(1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => unsetPostPrice(undefined, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => unsetPostPrice(post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})