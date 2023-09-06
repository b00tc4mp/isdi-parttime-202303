import { retrievePostSuggestions, createSuggestion, deleteSuggestion, retrieveSuggestion, updateSuggestion } from "../../logic"
import { useState, useEffect } from "react"
import { Button } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { Suggestion } from '.'
import { context } from "../../ui"
import { CreateSuggestion, DeleteSuggestion, EditSuggestion } from '.'

export default function SuggestionsModal({ post, user, handleLastPostsUpdate, lastPostsUpdate }) {
    const handleErrors = useHandleErrors()

    const [modal, setModal] = useState()
    const [suggestion, setSuggestion] = useState()
    const [suggestions, setSuggestions] = useState()

    useEffect(() => {
        handleRefreshSuggestions()

        console.log('Suggestion Modal -> Render')
    }, [lastPostsUpdate])

    const handleRefreshSuggestions = () => {
        handleErrors(async () => {
            const suggestions = await retrievePostSuggestions(post.id)

            setSuggestions(suggestions)
        })
    }

    const openCreateSuggestionModal = () => setModal('addSuggestion')

    const openEditSuggestionModal = () => {
        setModal('editSuggestion')

        handleErrors(async () => {
            const _suggestion = await retrieveSuggestion(context.suggestionId)

            setSuggestion(_suggestion)
        })
    }

    const openDeleteSuggestionModal = () => setModal('deleteSuggestion')

    const handleCloseModal = () => setModal(null)

    function handleCreateSuggestion(event) {
        event.preventDefault()

        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await createSuggestion(post.id, title, content)

            handleRefreshSuggestions()
            handleCloseModal()
        })
    }

    const handleDeleteSuggestion = event => {
        event.preventDefault()

        handleErrors(async () => {
            await deleteSuggestion(post.id, context.suggestionId)

            handleRefreshSuggestions()
            handleCloseModal()
            handleLastPostsUpdate()
        })
    }

    const handleEditSuggestion = event => {
        event.preventDefault()

        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await updateSuggestion(context.suggestionId, title, content)

            handleRefreshSuggestions()
            handleCloseModal()
            setSuggestion(null)
            handleLastPostsUpdate()
        })
    }

    return <>
        <section className="flex flex-col items-center w-full h-full py-4 px-1 pt-0">
            <div className="flex flex-col items-center justify-between h-full w-full gap-2">
                <h2 className="mb-4 font-bold text-xl">Suggestions</h2>
                <div className='flex flex-col overflow-scroll gap-2 w-full min-h-[320px] h-full'>
                    {suggestions && suggestions.map(suggestion => (!suggestion.hidden || suggestion.author.id === user.id) && <Suggestion
                        key={suggestion.id}
                        suggestion={suggestion}
                        openDeleteSuggestionModal={openDeleteSuggestionModal}
                        openEditSuggestionModal={openEditSuggestionModal}
                        user={user}
                        post={post}
                        handleLastPostsUpdate={handleLastPostsUpdate}
                        setSuggestion={setSuggestion}
                    />

                    )}
                </div>
                {user.id !== post.author.id ? <Button className="mb-20 mt-2" onClick={openCreateSuggestionModal}>Add suggestion</Button> : <div className="w-full h-2 mb-16"></div>}
            </div>

            {modal === 'addSuggestion' && <CreateSuggestion
                handleCreateSuggestion={handleCreateSuggestion}
                handleCloseModal={handleCloseModal}
            />}

            {modal === 'deleteSuggestion' && <DeleteSuggestion
                handleDeleteSuggestion={handleDeleteSuggestion}
                handleCloseModal={handleCloseModal}
            />}

            {modal === 'editSuggestion' && <EditSuggestion
                handleEditSuggestion={handleEditSuggestion}
                handleCloseModal={handleCloseModal}
                suggestion={suggestion}
                setSuggestion={setSuggestion}
            />}
        </section>
    </>
}
