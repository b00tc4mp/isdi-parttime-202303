import { context } from "../ui"


export default function Comment({ comment, handleDeleteComment }) {

  return <div className=" mx-2 flex justify-between">
    <div className="overflow-auto">
      {comment.author}: {comment.text}
    </div>
    {comment.authorId === context.userId && <span className="material-symbols-outlined cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>delete</span>}
  </div>
}