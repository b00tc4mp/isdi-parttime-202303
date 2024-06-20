import { users } from "../data"
import { posts } from "../data"
import { context } from "../ui"

export default function createComment(commentText) {

  const _users = users()
  const user = _users.find(user => user.id === context.userId)
  const _posts = posts()
  const post = _posts.find(post => post.id === context.postId)

  post.comments.push({
    author: user.name,
    text: commentText
  })
}