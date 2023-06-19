require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const deleteComment = require('./deleteComment')
const { populate, generate, cleanUp } = require('./helpers-test')

describe('', () => {
  let user, post, comment

  beforeEach(done => {
    user = generate.user()
    post = generate.post()

    comment = {
      author: user.name,
      authorId: user.id,
      text: `text-${Math.random()}`,
      id: `comment-${Math.random()}`
    }
    cleanUp(done)
  })

  it("Succeeds on deleting an own user's comment", done => {
    post.comments = [comment]
    const posts = [post]

    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify(posts), error => {
      expect(error).to.be.null

      deleteComment(post.id, comment.id, error => {
        expect(error).to.be.null

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
          expect(error).to.be.null

          const posts = JSON.parse(json)
          const _post = posts.find(_post => _post.id === post.id)
          
          expect(_post).to.exist
          expect(_post.comments).to.exist
          expect(_post.comments.length).to.equal(0)

          done()
        })
      })
    })
  })

  it('Fails on user not found', done => {
    const users = [user]

    post.comments = [comment]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      const wrongId = post.id + '-wrong'

      deleteComment(wrongId, comment.id, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Post not found.')

        done()
      })
    })
  })

  it('Fails on comment not found', done => {
    const users = [user]

    post.comments = [comment]
    const posts = [post]

    populate(users, posts, error => {
      if(error) {
        done(error)

        return
      }

      const wrongId = comment.id + '-wrong'

      deleteComment(post.id, wrongId, error => {
        expect(error).to.be.instanceOf(Error)
        expect(error.message).to.equal('Comment not found.')

        done()
      })
    })
  })

  it("Fails on post's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deleteComment('', comment.id, () => {})).to.throw('The post id field is empty.')
    })
  })
  
  it("Fails on post's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deleteComment(true, comment.id, () => {})).to.throw('The post id is not a string.')
      expect(() => deleteComment([], comment.id, () => {})).to.throw('The post id is not a string.')
      expect(() => deleteComment({}, comment.id, () => {})).to.throw('The post id is not a string.')
      expect(() => deleteComment(1, comment.id, () => {})).to.throw('The post id is not a string.')
      expect(() => deleteComment(undefined, comment.id, () => {})).to.throw('The post id is not a string.')
    })
  })
  
  it("Fails on comment's id field is empty", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deleteComment(post.id, '', () => {})).to.throw('The comment id field is empty.')
    })
  })
  
  it("Fails on comment's id is not a string", () => {
    writeFile(`${process.env.DB_PATH}/posts.json`, JSON.stringify([post]), error => {
      expect(error).to.be.null

      expect(() => deleteComment(post.id, true, () => {})).to.throw('The comment id is not a string.')
      expect(() => deleteComment(post.id, [], () => {})).to.throw('The comment id is not a string.')
      expect(() => deleteComment(post.id, {}, () => {})).to.throw('The comment id is not a string.')
      expect(() => deleteComment(post.id, 1, () => {})).to.throw('The comment id is not a string.')
      expect(() => deleteComment(post.id, undefined, () => {})).to.throw('The comment id is not a string.')
    })
  })

  it('Fails on callBack is not a function', () => {
    writeFile(`${process.env.DB_PATH}/users.json`, JSON.stringify([user]), error => {
      expect(error).to.be.null

      expect(() => deleteComment(post.id, comment.id, 'Not a function')).to.throw(Error, 'CallBack is not a function')
    })
  })
})