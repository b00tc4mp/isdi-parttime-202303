import { context } from "../../ui";
import { useState } from "react";
import { useHandleErrors } from "../hooks";
import { toggleCheckSuggestion, toggleHideSuggestion } from '../../logic'

export default function Suggestion({ suggestion, openDeleteSuggestionModal, openEditSuggestionModal, user, page }) {
  const handleErrors = useHandleErrors()
  const [checked, setChecked] = useState(suggestion.checked)
  const [hidden, setHidden] = useState(false)

  const handleOpenDeleteSuggestion = () => {
    context.suggestionId = suggestion.id

    openDeleteSuggestionModal()
  }

  const handleOpenEditSuggestion = () => {
    context.suggestionId = suggestion.id

    openEditSuggestionModal()
  }

  const handleToggleCheckSuggestion = () => {
    handleErrors(async () => {
      await toggleCheckSuggestion(suggestion.id)

      setChecked(!checked)
    })
  }

  const handleHideSuggestion = () => {
    handleErrors(async () => {
      await toggleHideSuggestion(suggestion.id)

      setHidden(!hidden)
    })
  }
  
  return <div className=" mx-2 flex flex-col justify-between border p-2 rounded min-h-[150px] bg-white">
    <div className="overflow-auto flex justify-between">
      <div className="flex gap-1 items-center">
        <img className="h-5 w-5 object-cover rounded-full" src={suggestion.author.avatar || user.avatar} alt="Suggestion author avatar" />
        <p>{suggestion.author.name || user.name}</p>
      </div>
      <div className="flex gap-2 h-7">
        {suggestion.postAuthor === user.id && checked && !hidden && <span className="material-symbols-outlined" onClick={handleHideSuggestion}>visibility_off</span>}
        {suggestion.postAuthor === user.id && <p className="overflow-hidden flex items-center"><span className={`material-symbols-outlined ${checked && 'bg-green-500 rounded-full'} mr-1`} onClick={handleToggleCheckSuggestion}>check</span>{checked ? 'Checked' : 'To check'}</p>}
        {(suggestion.author.id === user.id || page === 'mySuggestions') && <>
          {!checked && <span className="material-symbols-outlined" onClick={handleOpenEditSuggestion}>edit_note</span>}
          <span className="material-symbols-outlined" onClick={handleOpenDeleteSuggestion}>delete</span>
          {checked && <p className="overflow-hidden flex items-center"><span className='material-symbols-outlined bg-green-500 rounded-full mr-1'>check</span>Checked</p>}
        </>}
      </div>
    </div>
    <div className="w-full flex justify-center">
      <h1 className="text-2xl">{suggestion.title}</h1>
    </div>
    <p className="mb-2">{suggestion.content}</p>
  </div>
}