export default function Suggestion({ suggestion, handleDeleteSuggestion }) {
    return <div className=" mx-2 flex justify-between">
      <div className="overflow-auto">
        
        <p><b>{comment.author}: </b>{comment.text}</p>
        
      </div>
      {comment.authorId === user.id && <span className="material-symbols-outlined cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>delete</span>}
    </div>
  }