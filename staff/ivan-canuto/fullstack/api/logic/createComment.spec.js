require('dotenv').config()

const { expect } = require('chai')
const createComment = require('./createComment')
const { cleanUp, generate, populate } = require('./helpers-test')
const mongoose = require('mongosse')
const { User, Post } = require('../data/models')
const { errors: { ExistenceError, InvalidRequestError, ContentError } } = require('com')

describe('createComment', () => {
  let commentText
  const userId = 'user-1'
  const userName = 'userName'
  const postId = 'post-1'

  before(done => {
    mongoose.connect(process.env.MONGODB_URL)
      .then(() => done())
      .catch(done)
  })

  beforeEach(done => {
    user = generate.user()
    name = user.name
    email = user.email
    password = user.password

    cleanUp()
      .then(() => populate(user, []))
      .then(() => User.findOne({ email: email }))
      .then(_user => {
        post = generate.post(_user._id)
        author = post.author
        image = post.image
        text = post.text

        return populate([], post)
          .then(() => done())
          .catch(done)
      })
  })

  it('Succeeds on creating comment with not previous comment', () => {
    return User.findOne({ email: email})
      .then(_user => Post.findOne)  
    createComment(userId, postId, commentText)

        expect(post.comments[0].author).to.equal(userName)
        expect(post.comments[0].authorId).to.equal(userId)
        expect(post.comments[0].text).to.equal(commentText)
        expect(post.comments[0].id).to.equal('comment-1')
  })

  it('Succeeds on creating comment with existing comments', done => {
    const post = [{id: postId, comments: [{author: userName, authorId: userId, text: 'Good post!', id: 'comment-2'}]}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null

      createComment(commentText, userId, postId, error => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null
          
          const posts = JSON.parse(json)
          const post = posts.find(post => post.id === postId)
          
          expect(post).to.exist

          expect(post.comments[post.comments.length - 1].author).to.equal(userName)
          expect(post.comments[post.comments.length - 1].authorId).to.equal(userId)
          expect(post.comments[post.comments.length - 1].text).to.equal(commentText)
          expect(post.comments[post.comments.length - 1].id).to.equal('comment-3')

          done()
        })
      })
    })
  })

  it('Fails on user not found', done => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      
      const wrongUserId = userId + 'wrong'

      createComment(commentText, wrongUserId, postId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`User with id ${wrongUserId} not found.`)

        done()
      })
    })
  })
  
  it('Fails on post not found', done => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      
      const wrongPostId = postId + 'wrong'

      createComment(commentText, userId, wrongPostId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`Post with id ${wrongPostId} not found.`)

        done()
      })
    })
  })

  it('Fails on commentText field is empty', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment('', userId, postId, () => {})).to.throw(Error, 'The comment text field is empty.')
    })
  })
  
  it('Fails on commentText is not a string', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment(true, userId, postId, () => {})).to.throw(Error, 'The comment text is not a string.')
      expect(() => createComment([], userId, postId, () => {})).to.throw(Error, 'The comment text is not a string.')
      expect(() => createComment({}, userId, postId, () => {})).to.throw(Error, 'The comment text is not a string.')
      expect(() => createComment(1, userId, postId, () => {})).to.throw(Error, 'The comment text is not a string.')
      expect(() => createComment(undefined, userId, postId, () => {})).to.throw(Error, 'The comment text is not a string.')
    })
  })
  
  it('Fails on userId field is empty', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment(commentText, '', postId, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it('Fails on commentText is not a string', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment(commentText, true, postId, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createComment(commentText, [], postId, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createComment(commentText, {}, postId, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createComment(commentText, 1, postId, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => createComment(commentText, undefined, postId, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it('Fails on post id field is empty', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment(commentText, userId, '', () => {})).to.throw(Error, 'The post id field is empty.')
      
    })
  })
    
  it('Fails on post id is not a string', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      expect(() => createComment(commentText, userId, true, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => createComment(commentText, userId, [], () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => createComment(commentText, userId, {}, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => createComment(commentText, userId, 1, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => createComment(commentText, userId, undefined, () => {})).to.throw(Error, 'The post id is not a string.')      
    })
  })

  it('Fails on callBack is not a function', () => {
    const post = [{id: postId, comments: []}]
    const postToJSON = JSON.stringify(post)

    writeFile(`${process.env.DB_PATH}/posts.json`, postToJSON, error => {
      expect(error).to.be.null
      
      expect(() => createComment(commentText, userId, postId, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})