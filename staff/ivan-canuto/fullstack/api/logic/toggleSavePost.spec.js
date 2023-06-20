require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const toggleSavePost = require('./toggleSavePost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('toggleSavePost', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it("Succeeds on saving a post as favorite by user", done => {
    const users = [user]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }
      
      toggleSavePost(user.id, post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
          expect(error).to.be.null

          const DBUsers = JSON.parse(json)
          const DBUser = DBUsers.find(_user => _user.id === user.id)

          expect(DBUser).to.exist
          expect(DBUser.favs).to.have.lengthOf(1)
          expect(DBUser.favs[0]).to.equal('post-1')
          
          done()
        })
      })
    })
  })
  
  it("Succeeds on unsaving a post by user", done => {
    const posts = [post]

    user.favs = ['post-1']
    const users = [user]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }
      
      toggleSavePost(user.id, post.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
          expect(error).to.be.null

          const DBUsers = JSON.parse(json)
          const DBUser = DBUsers.find(_user => _user.id === user.id)

          expect(DBUser).to.exist
          expect(DBUser.favs).to.have.lengthOf(0)
          
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
      
      toggleSavePost(wrongUserId, post.id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleSavePost('', post.id, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleSavePost(true, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleSavePost([], post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleSavePost({}, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleSavePost(1, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => toggleSavePost(undefined, post.id, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleSavePost(user.id, '', () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => toggleSavePost(user.id, true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleSavePost(user.id, [], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleSavePost(user.id, {}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleSavePost(user.id, 1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => toggleSavePost(user.id, undefined, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => toggleSavePost(user.id, post.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})