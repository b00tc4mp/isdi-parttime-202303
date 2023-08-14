import { context } from "../../ui";

export default function Suggestion({ suggestion, openDeleteSuggestionModal, openEditSuggestionModal, user }) {
  const handleOpenDeleteSuggestion = () => {
    context.suggestionId = suggestion.id

    openDeleteSuggestionModal()
  }

  const handleOpenEditSuggestion = () => {
    context.suggestionId = suggestion.id

    openEditSuggestionModal()
  }
  
  return <div className=" mx-2 flex flex-col justify-between border p-2 rounded">
    <div className="overflow-auto flex justify-between">
      <p>{suggestion.author.name}</p>
      {suggestion.author.id === user.id && <div>
          <span className="material-symbols-outlined" onClick={handleOpenEditSuggestion}>edit_note</span>
          <span className="material-symbols-outlined" onClick={handleOpenDeleteSuggestion}>delete</span>
        </div>
      }
    </div>
    <div className="w-full flex justify-center">
      <h1 className="text-2xl">{suggestion.title}</h1>
    </div>
    <p>{suggestion.content}</p>
  </div>
}