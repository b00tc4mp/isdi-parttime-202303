import { utils } from "com"
import { context } from "../ui"

const { extractSubFromToken } = utils

export default function Comment({ comment, handleDeleteComment }) {

  return <div className=" mx-2 flex justify-between">
    <div className="overflow-auto">
      {comment.author}: {comment.text}
    </div>
    {comment.authorId === extractSubFromToken(context.token) && <span className="material-symbols-outlined cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>delete</span>}
  </div>
}