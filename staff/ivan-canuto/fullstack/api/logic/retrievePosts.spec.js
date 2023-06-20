require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const retrievePosts = require('./retrievePosts')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('retrievePosts', () => {
  let user, post

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)

    cleanUp(done)
  })

  it('Succeed on retrieving the existing app posts', done => {
    const post2 = post
    post2.id = 'post-2'

    const users = [user]
    const posts = [post, post2]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      retrievePosts(user.id, (error, DBPosts) => {
        expect(error).to.be.null

        expect(DBPosts[0].author.id).to.equal(user.id)
        expect(DBPosts[0].author.name).to.equal(user.name)
        expect(DBPosts[0].author.avatar).to.equal(user.avatar)
        expect(DBPosts[0].author.favs).to.have.lengthOf(0)
        expect(DBPosts[0].comments).to.have.lengthOf(0)
        expect(DBPosts[0].date).to.equal(post.date)
        expect(DBPosts[0].id).to.equal(post.id)
        expect(DBPosts[0].image).to.equal(post.image)

        expect(DBPosts[1].author.id).to.equal(user.id)
        expect(DBPosts[1].author.name).to.equal(user.name)
        expect(DBPosts[1].author.avatar).to.equal(user.avatar)
        expect(DBPosts[1].author.favs).to.have.lengthOf(0)
        expect(DBPosts[1].comments).to.have.lengthOf(0)
        expect(DBPosts[1].date).to.equal(post.date)
        expect(DBPosts[1].id).to.equal(post.id)
        expect(DBPosts[1].image).to.equal(post.image)

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
      
      retrievePosts(wrongUserId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePosts('', () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => retrievePosts(true, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePosts([], () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePosts({}, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePosts(1, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrievePosts(undefined, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => retrievePosts(post.id, user.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})