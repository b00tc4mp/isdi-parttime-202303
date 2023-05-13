import { savePost } from "../data"
import { users } from "../data"
import { context } from "../ui"
import { v4 as uuidv4 } from 'uuid';

export default function createComment(commentText, post) {

  const _users = users()
  const user = _users.find(user => user.id === context.userId)
  const _post = post

  _post.comments.push({
    author: user.name,
    authorId: user.id,
    text: commentText,
    id: uuidv4()
  })
  savePost(_post)
}