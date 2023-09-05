import { context } from "../../ui";
import { useState } from "react";
import { useHandleErrors } from "../hooks";
import { savePostAsSeen, toggleCheckSuggestion, hideSuggestion } from '../../logic'

export default function Suggestion({ suggestion, openDeleteSuggestionModal, openEditSuggestionModal, user, page, handleLastPostsUpdate, handleShowPost }) {
    const handleErrors = useHandleErrors()
    const [checked, setChecked] = useState(suggestion.checked)
    const [hidden, setHidden] = useState(false)

    const handleOpenDeleteSuggestion = () => {
        context.suggestionId = suggestion.id

        openDeleteSuggestionModal()

        handleLastPostsUpdate()
    }

    const handleOpenEditSuggestion = () => {
        context.suggestionId = suggestion.id

        openEditSuggestionModal()

        handleLastPostsUpdate()
    }


    const handleToggleCheckSuggestion = () => {
        handleErrors(async () => {
            await toggleCheckSuggestion(suggestion.id)

            setChecked(!checked)

            handleLastPostsUpdate()
        })
    }

    const handleHideSuggestion = () => {
        handleErrors(async () => {
            await hideSuggestion(suggestion.id)

            setHidden(!hidden)

            handleLastPostsUpdate()
        })
    }

    const handleShowPostModal = postId => {
        handleErrors(async () => {
            await savePostAsSeen(postId)
        })

        document.body.classList.add('fixed-scroll')

        context.postId = postId

        handleShowPost()

        handleLastPostsUpdate()
    }

    return <>
        <div className=" mx-2 flex flex-col justify-between border p-2 rounded min-h-40 bg-white">
            <div className="overflow-hidden flex justify-between">
                <div className="flex gap-1 items-center">
                    <img className="h-5 w-5 object-cover rounded-full" src={suggestion.author.avatar || user.avatar} alt="Suggestion author avatar" />
                    <p>{suggestion.author.name || user.name}</p>
                </div>
                <div className="flex gap-3">
                    {suggestion.postAuthor === user.id && checked && !hidden && <span className="material-symbols-outlined" onClick={handleHideSuggestion}>visibility_off</span>}
                    {suggestion.postAuthor === user.id && <p className="overflow-hidden flex items-center"><span className={`material-symbols-outlined ${checked && 'bg-green-500 rounded-full'} mr-1`} onClick={handleToggleCheckSuggestion}>check</span>{checked ? 'Checked' : 'To check'}</p>}
                    {page === 'mySuggestions' && <p className="rounded-full border border-gray-400 px-1 flex itmes-center" onClick={() => handleShowPostModal(suggestion.post)}>Go to post<span className="material-symbols-outlined text-base">arrow_forward_ios</span></p>}
                    {(suggestion.author.id === user.id || page === 'mySuggestions') && <>
                        {!checked && <span className="material-symbols-outlined" onClick={handleOpenEditSuggestion}>edit_note</span>}
                        <span className="material-symbols-outlined" onClick={handleOpenDeleteSuggestion}>delete</span>
                        {checked && <p className="overflow-hidden flex items-center"><span className='material-symbols-outlined bg-green-500 rounded-full mr-1'>check</span>Checked</p>}
                    </>}
                </div>
            </div>
            <div className="w-full flex justify-center">
                <h1 className="text-xl text-center mt-4 mb-3">{suggestion.title}</h1>
            </div>
            <p className="mb-2">{suggestion.content}</p>
        </div>
    </>
}