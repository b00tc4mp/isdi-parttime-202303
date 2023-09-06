import { useEffect, useState } from "react"
import { deleteSuggestion, retrieveOwnSuggestions, retrieveSuggestion, updateSuggestion, retrieveOwnPostsSuggestions } from "../../logic"
import { Suggestion } from '../components'
import { useHandleErrors } from "../hooks"
import { EditSuggestion, DeleteSuggestion } from "../components"
import { context } from "../../ui"
import { PostModalWindow } from ".";

export default function SuggestionsPage({ user, handleLastPostsUpdate, lastPostsUpdate, page, handleOpenEditPost, handleOpenDeletePost }) {
    const handleErrors = useHandleErrors()

    const [modal, setModal] = useState()
    const [suggestions, setSuggestions] = useState()
    const [suggestion, setSuggestion] = useState()
    const [post, setPost] = useState(false)

    useEffect(() => {
        handleRefershSuggestions()

        console.log('Suggestion Page -> Render')
    }, [lastPostsUpdate, page])

    const handleRefershSuggestions = () => {
        if(page === 'Suggestions') {
            handleErrors(async () => {
                const _suggestions = await retrieveOwnSuggestions()
                
                setSuggestions(_suggestions)
            })
        } else if(page === 'OwnPostsSuggestions') {
            handleErrors(async () => {
                const _suggestions = await retrieveOwnPostsSuggestions()
                
                setSuggestions(_suggestions)
            })
        }
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

    console.log(suggestions)

    return <section className="flex flex-col gap-4 p-2 absolute top-28 left-0 overflow-scroll pb-8 w-full items-center">
        {suggestions && <h1 className="w-full text-center text-5xl font-thin underline mb-4">{page === 'Suggestions' ? 'My suggestions' : 'Own posts suggestions'}</h1>}
        {suggestions && suggestions.map(suggestion => (!suggestion.hidden || suggestion.author.id === user.id) && <Suggestion
                key={suggestion.id}
                openEditSuggestionModal={openEditSuggestionModal}
                openDeleteSuggestionModal={openDeleteSuggestionModal}
                suggestion={suggestion}
                user={user}
                handleLastPostsUpdate={handleLastPostsUpdate}
                setSuggestion={setSuggestion}
                handleShowPost={handleShowPost}
                modal={'suggestionModal'}
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
            handleOpenDeletePost={handleOpenDeletePost}
            handleOpenEditPost={handleOpenEditPost}
        />}
    </section>
}