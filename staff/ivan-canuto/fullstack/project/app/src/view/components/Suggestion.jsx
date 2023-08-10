export default function Suggestion({ suggestion, handleDeleteSuggestion, user }) {
  console.log(suggestion)
  return <div className=" mx-2 flex justify-between">
    <div className="overflow-auto">
      <p>{suggestion.author.name}</p>
      {suggestion.author.id === user.id && <span className="material-symbols-outlined cursor-pointer" onClick={() => handleDeleteSuggestion(suggestion.id)}>delete</span>}
    </div>
    <h1>{suggestion.title}</h1>
    <p>{suggestion.content}</p>
  </div>
}