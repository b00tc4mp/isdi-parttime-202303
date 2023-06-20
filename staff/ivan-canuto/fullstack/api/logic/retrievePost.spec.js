require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const retrievePost = require('./retrievePost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('retrievePost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('Succeeds on retrieving the requested object', done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      retrievePost(user.id, post.id, (error, _post) => {
        expect(error).to.be.null

        expect(_post.author.id).to.equal(user.id)
        expect(_post.author.name).to.equal(user.name)
        expect(_post.author.avatar).to.equal(user.avatar)
        expect(_post.author.favs).to.have.lengthOf(0)
        expect(_post.comments).to.have.lengthOf(0)
        expect(_post.date).to.equal(post.date)
        expect(_post.id).to.equal(post.id)
        expect(_post.image).to.equal(post.image)

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
      
      retrievePost(wrongUserId, post.id, error => {
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

      retrievePost(user.id, wrongPostId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePost('', post.id, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePost(true, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePost([], post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePost({}, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePost(1, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePost(undefined, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePost(user.id, '', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePost(user.id, true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => retrievePost(user.id, [], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => retrievePost(user.id, {}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => retrievePost(user.id, 1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => retrievePost(user.id, undefined, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => retrievePost(user.id, post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})