import { useEffect, useState } from "react"
import { deleteSuggestion, retrieveOwnSuggestions, retrieveSuggestion, updateSuggestion } from "../../logic"
import { Suggestion } from '../components'
import { useHandleErrors } from "../hooks"
import { EditSuggestion, DeleteSuggestion } from "../components"
import { context } from "../../ui"
import { PostModalWindow } from ".";

export default function SuggestionsPage({ user, setPage, handleLastPostsUpdate, lastPostsUpdate }) {
    const handleErrors = useHandleErrors()

    const [modal, setModal] = useState()
    const [suggestions, setSuggestions] = useState()
    const [suggestion, setSuggestion] = useState()
    const [post, setPost] = useState(false)

    useEffect(() => {
        handleRefershSuggestions()

        setPage('Suggestions')

        console.log('Suggestion Page -> Render')
    }, [lastPostsUpdate])

    const handleRefershSuggestions = () => {
        handleErrors(async () => {
            const _suggestions = await retrieveOwnSuggestions()
            
            setSuggestions(_suggestions)
        })
    }

    const handleCloseModal = () => {
        document.body.classList.remove('fixed-scroll')

        setModal()
    }

    const openEditSuggestionModal = () => {
        document.body.classList.add('fixed-scroll')

        setModal('editSuggestion')

        handleErrors(async () => {
            const _suggestion = await retrieveSuggestion(context.suggestionId)

            setSuggestion(_suggestion)
        })
    }

    const openDeleteSuggestionModal = () => {
        document.body.classList.add('fixed-scroll')

        setModal('deleteSuggestion')
    }

    const handleEditSuggestion = event => {
        event.preventDefault()

        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await updateSuggestion(suggestion.id, title, content)

            handleCloseModal()

            handleRefershSuggestions()

            setSuggestion(null)
        })
    }

    const handleDeleteSuggestion = event => {
        event.preventDefault()

        handleErrors(async () => {
            await deleteSuggestion(suggestion.post, suggestion.id)

            handleRefershSuggestions()

            handleCloseModal()
        })
    }

    const handleShowPost = () => {
        document.body.classList.remove('fixed-scroll')
        
        setPost(true)
    }

    const handleHidePost = () => {
        document.body.classList.remove('fixed-scroll')

        context.postId = null

        setPost(false)

        handleLastPostsUpdate()
    }

    return <section className="flex flex-col gap-4 p-2 absolute top-28 left-0 overflow-scroll pb-8 w-full items-center">
        {suggestions && <h1 className="w-full text-center text-5xl font-thin underline mb-4">My suggestions</h1>}
        {suggestions && suggestions.map(suggestion => <Suggestion
                key={suggestion.id}
                openEditSuggestionModal={openEditSuggestionModal}
                openDeleteSuggestionModal={openDeleteSuggestionModal}
                suggestion={suggestion}
                user={user}
                page={'mySuggestions'}
                handleLastPostsUpdate={handleLastPostsUpdate}
                setSuggestion={setSuggestion}
                handleShowPost={handleShowPost}
            />
        )}
        {(!suggestions || !suggestions.length) && <h2 className="text-2xl my-10 border border-gray-600 p-4 rounded-lg">There is still no suggestions</h2>}
        {modal === 'editSuggestion' && <EditSuggestion
            handleEditSuggestion={handleEditSuggestion}
            handleCloseModal={handleCloseModal}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
        />}
        {modal === 'deleteSuggestion' && <DeleteSuggestion
            handleDeleteSuggestion={handleDeleteSuggestion}
            handleCloseModal={handleCloseModal}
        />}
        {post && <PostModalWindow
            page={'mySuggestions'}
            handleHidePost={handleHidePost}
            handleLastPostsUpdate={handleLastPostsUpdate}
        />}
    </section>
}