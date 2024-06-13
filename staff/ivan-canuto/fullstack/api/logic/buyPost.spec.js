require('dotenv').config()

const { expect } = require('chai')
const buyPost = require('./buyPost')
const { cleanUp, generate, populate } = require('./helpers-test')
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const { errors: { ExistenceError, InvalidRequestError, ContentError } } = require('com')
const { Types: { ObjectId } } = mongoose


describe('buyPost', () => {
  let user, name, email, password, post, author, image, text

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
  

  it('Succeeds on buying on sale post', () => {
    return User.findOne({ email: email })
      .then(_user => {
        return Post.findOne({ author: _user.id })
          .then(_post => {
            _post.onSale = '1000'
            
            return _post.save()
              .then(() => buyPost(_user.id, _post.id))
              .then(() => Post.findOne({ _id: _post.id }))
              .then(updatedPost => {
                expect(updatedPost).to.exist
                expect(updatedPost.onSale).to.equal('Sold')    
              })
          })
      })
  })
  
  it('Fails on post not found', () => {
    const wrongId = new ObjectId().toString()

    return User.findOne({ email: email })
      .then(_user => buyPost(_user.id, wrongId))
      .catch(error => {
        console.log(error.message);
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`Post with id ${wrongId} not found.`)
      })
  })

  it('Fails on post not on sale', () => {
    return User.findOne({ email: email })
      .then(_user => {
        return Post.findOne({ author: _user.id })
          .then(_post => buyPost(_user.id, _post.id))
          .catch(error => {
            expect(error).to.be.instanceOf(InvalidRequestError)
            expect(error.message).to.equal('This post is not on sale.')
          })
      })
  })

  it('Fails on post already sold', () => {
    return User.findOne({ email: email })
      .then(_user => {
        return Post.findOne({ author: _user.id })
          .then(_post => {
            _post.onSale = 'Sold'
            
            return _post.save()
              .then(() => buyPost(_user.id, _post.id))
              .catch(error => {
                expect(error).to.be.instanceOf(InvalidRequestError)
                expect(error.message).to.equal('This post is already sold.')
              })
          })
      })
  })

  it(`Fails on user's id is empty`, () => expect(() => buyPost('', 'post-id')).to.throw(ContentError, 'The user id field is empty.'))

  it(`Fails on user's id is not a string`, () => {
    expect(() => buyPost(true, 'post-id')).to.throw(TypeError, 'The user id is not a string.')
    expect(() => buyPost([], 'post-id')).to.throw(TypeError, 'The user id is not a string.')
    expect(() => buyPost({}, 'post-id')).to.throw(TypeError, 'The user id is not a string.')
    expect(() => buyPost(undefined, 'post-id')).to.throw(TypeError, 'The user id is not a string.')
    expect(() => buyPost(1, 'post-id')).to.throw(TypeError, 'The user id is not a string.')
  })

  it(`Fails on post's id is empty`, () => expect(() => buyPost('user-id', '')).to.throw(ContentError, 'The post id field is empty.'))

  it(`Fails on post's id is not a string`, () => {
    expect(() => buyPost('user-id', true)).to.throw(TypeError, 'The post id is not a string.')
    expect(() => buyPost('user-id', [])).to.throw(TypeError, 'The post id is not a string.')
    expect(() => buyPost('user-id', {})).to.throw(TypeError, 'The post id is not a string.')
    expect(() => buyPost('user-id', undefined)).to.throw(TypeError, 'The post id is not a string.')
    expect(() => buyPost('user-id', 1)).to.throw(TypeError, 'The post id is not a string.')
  })

  after(done => {
    cleanUp()
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done)
  })
})