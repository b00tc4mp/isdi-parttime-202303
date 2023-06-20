require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const setPostPrice = require('./setPostPrice')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('setPostPrice', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it("Succeeds on setting a price to a post", done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      setPostPrice(post.id, '999', error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.onSale).to.equal('999')

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
      
      const wrongPostId = post.id + '-wrong'
      
      setPostPrice(wrongPostId, '999', error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
      })
    })
  })

  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => setPostPrice('', '999', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => setPostPrice(true, '999', () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => setPostPrice([], '999', () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => setPostPrice({}, '999', () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => setPostPrice(1, '999', () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => setPostPrice(undefined, '999', () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })
  
  it("Fails on post's price field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => setPostPrice(post.id, '', () => {})).to.throw(Error, 'The post price field is empty.')
    })
  })
  
  it("Fails on post's price is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => setPostPrice(post.id, true, () => {})).to.throw(Error, 'The post price is not a string.')
      expect(() => setPostPrice(post.id, [], () => {})).to.throw(Error, 'The post price is not a string.')
      expect(() => setPostPrice(post.id, {}, () => {})).to.throw(Error, 'The post price is not a string.')
      expect(() => setPostPrice(post.id, 1, () => {})).to.throw(Error, 'The post price is not a string.')
      expect(() => setPostPrice(post.id, undefined, () => {})).to.throw(Error, 'The post price is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => setPostPrice(post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})