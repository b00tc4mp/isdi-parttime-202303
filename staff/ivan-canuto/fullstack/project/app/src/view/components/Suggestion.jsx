import { context } from "../../ui";
import { useState } from "react";

export default function Suggestion({ suggestion, openDeleteSuggestionModal, openEditSuggestionModal, openCheckSuggestionModal, user, post }) {
  const [checked, setChecked] = useState(suggestion.checked)

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
      <div className="flex gap-2 h-7">
        {suggestion.author.id === user.id && <>
          <span className="material-symbols-outlined" onClick={handleOpenEditSuggestion}>edit_note</span>
          <span className="material-symbols-outlined" onClick={handleOpenDeleteSuggestion}>delete</span>
        </>}
        {suggestion.postAuthor === post.author.id && <span className="material-symbols-outlined" onClick={openCheckSuggestionModal}>check</span>}
      </div>
    </div>
    <div className="w-full flex justify-center">
      <h1 className="text-2xl">{suggestion.title}</h1>
    </div>
    <p>{suggestion.content}</p>
  </div>
}