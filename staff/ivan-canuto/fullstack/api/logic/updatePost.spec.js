require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const updatePost = require('./updatePost')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('updatePost', () => {
  let user, post, newImage, newText

  beforeEach(done => {
    user = generate.user()
    post = generate.post(user.id)
    newImage = `new-image.jpeg/${Math.random()}`
    newText = `new-text-${Math.random()}`
    
    cleanUp(done)
  })
  
  it("Succeeds on updating a post with a new image or a new text", done => {
    const users = [user]
    const posts = [post]
    
    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      updatePost(user.id, post.id, newImage, newText, error => {
        expect(error).to.be.null
        
        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null
          
          const DBPosts = JSON.parse(json)
          const DBPost = DBPosts.find(_post => _post.id === post.id)

          expect(DBPost).to.exist
          expect(DBPost.image).to.equal(newImage)
          expect(DBPost.text).to.equal(newText)
          
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
      
      updatePost(wrongUserId, post.id, newImage, newText, error => {
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

      updatePost(user.id, wrongPostId, newImage, newText, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal(`Post with id ${wrongPostId} not found.`)
        
        done()
      })
    })
  })

  it('Fails on the current user is not the owner of the post', done => {
    const user2 = generate.user()
    user2.id = `user-${Math.random()}`

    const users = [user, user2]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      updatePost(user2.id, post.id, newImage, newText, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('There must be an error, this user is not the owner of the post.')

        done()
      })
    })
  })

  it("Fails on user's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost('', post.id, newImage, newText, newImage, newText, () => {})).to.throw(Error, 'The user id field is empty.')
    })
  })
  
  it("Fails on user's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(true, post.id, newImage, newText, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => updatePost([], post.id, newImage, newText, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => updatePost({}, post.id, newImage, newText, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => updatePost(1, post.id, newImage, newText, () => {})).to.throw(Error, 'The user id is not a string.')
      expect(() => updatePost(undefined, post.id, newImage, newText, () => {})).to.throw(Error, 'The user id is not a string.')
    })
  })
  
  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, '', newImage, newText, () => {})).to.throw(Error, 'The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, true, newImage, newText, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => updatePost(user.id, [], newImage, newText, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => updatePost(user.id, {}, newImage, newText, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => updatePost(user.id, 1, newImage, newText, () => {})).to.throw(Error, 'The post id is not a string.')
      expect(() => updatePost(user.id, undefined, newImage, newText, () => {})).to.throw(Error, 'The post id is not a string.')
    })
  })

  it("Fails on image url field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, '', newText, () => {})).to.throw(Error, 'The image url field is empty.')
    })
  })
  
  it("Fails on image's url is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, true, newText, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => updatePost(user.id, post.id, [], newText, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => updatePost(user.id, post.id, {}, newText, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => updatePost(user.id, post.id, 1, newText, () => {})).to.throw(Error, 'The image url is not a string.')
      expect(() => updatePost(user.id, post.id, undefined, newText, () => {})).to.throw(Error, 'The image url is not a string.')
    })
  })

  it("Fails on image's url field does not contains a .jpg/.jpg/.webp/.png extension", () => {
    const wrongUrl = 'data:image;base64,/withou-the-correct-extension'

    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, wrongUrl, newText, () => {})).to.throw(Error, 'The url entered does not includes a .jpg/.jpg/.webp/.png extension.')
    })
  })
  
  it("Fails on post's text field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, newImage, '', () => {})).to.throw(Error, 'The post text field is empty.')
    })
  })
  
  it("Fails on post's text is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, newImage, true, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => updatePost(user.id, post.id, newImage, [], () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => updatePost(user.id, post.id, newImage, {}, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => updatePost(user.id, post.id, newImage, 1, () => {})).to.throw(Error, 'The post text is not a string.')
      expect(() => updatePost(user.id, post.id, newImage, undefined, () => {})).to.throw(Error, 'The post text is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => updatePost(user.id, post.id, newImage, newText, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })

  after(cleanUp)
})