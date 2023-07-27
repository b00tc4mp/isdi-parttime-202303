export default function Comment({ comment, handleDeleteComment, user }) {
    return <div className=" mx-2 flex justify-between">
      <div className="overflow-auto">
        {comment.author}: {comment.text}
      </div>
      {comment.authorId === user.id && <span className="material-symbols-outlined cursor-pointer" onClick={() => handleDeleteComment(comment._id)}>delete</span>}
    </div>
  }