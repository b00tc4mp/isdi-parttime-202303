require('dotenv').config()

const { expect } = require('chai')
const { writeFile } = require('fs')
const retrieveSavedPosts = require('./retrieveSavedPosts')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('retrieveSavedPosts', () => {
  let user, post1, post2

  beforeEach(done => {
    user = generate.user()
    post1 = generate.post(user.id)
    post2 = generate.post(user.id)

    cleanUp(done)
  })

  it('Succeed on retrieving the saved app posts by the user', done => {
    user.favs = ['post-2']

    post2.id = 'post-2'

    const users = [user]
    const posts = [post1, post2]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      retrieveSavedPosts(user.id, (error, DBPosts) => {
        expect(error).to.be.null

        expect(DBPosts).to.have.lengthOf(1)
        expect(DBPosts[0].author.id).to.equal(user.id)
        expect(DBPosts[0].author.name).to.equal(user.name)
        expect(DBPosts[0].author.avatar).to.equal(user.avatar)
        expect(DBPosts[0].author.favs).to.have.lengthOf(1)
        expect(DBPosts[0].author.favs[0]).to.equal('post-2')
        expect(DBPosts[0].comments).to.have.lengthOf(0)
        expect(DBPosts[0].date).to.equal(post2.date)
        expect(DBPosts[0].id).to.equal(post2.id)
        expect(DBPosts[0].image).to.equal(post2.image)

        done()
      })
    })
  })

  it('Fails on user not found', done => {
    const users = [user]
    const posts = [post1, post2]
    
    populate(users, posts, error => {
      if(error) {
        done(error)
        
        return
      }
      
      const wrongUserId = user.id + '-wrong'
      
      retrieveSavedPosts(wrongUserId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('User not found.')
        
        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post2]), error => {
      expect(error).to.be.null

      expect(() => retrieveSavedPosts('', () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post2]), error => {
      expect(error).to.be.null

      expect(() => retrieveSavedPosts(true, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveSavedPosts([], () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveSavedPosts({}, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveSavedPosts(1, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => retrieveSavedPosts(undefined, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => retrieveSavedPosts(user.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
  
  after(cleanUp)
})