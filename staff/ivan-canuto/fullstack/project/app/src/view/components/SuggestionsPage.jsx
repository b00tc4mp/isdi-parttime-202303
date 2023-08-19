import { useEffect, useState } from "react"
import { deleteSuggestion, retrieveOwnSuggestions, retrieveSuggestion, updateSuggestion } from "../../logic"
import { Suggestion } from '../components'
import { useHandleErrors } from "../hooks"
import { EditSuggestion, DeleteSuggestion } from "../components"
import { context } from "../../ui"

export default function SuggestionsPage({ user, setPage }) {
    const handleErrors = useHandleErrors()

    const [modal, setModal] = useState()
    const [suggestions, setSuggestions] = useState()
    const [suggestion, setSuggestion] = useState()

    useEffect(() => {
        handleRefershSuggestions()

        setPage('Suggestions')

        console.log('Suggestion Page -> Render')
    }, [])

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

        handleErrors(async () => {
            const _suggestion = retrieveSuggestion(context.suggestionId)

            setSuggestion(_suggestion)
        })
    }

    const handleEditSuggestion = event => {
        event.preventDefault()

        const title = event.target.title.value
        const content = event.target.content.value

        handleErrors(async () => {
            await updateSuggestion(suggestion.id, title, content)

            handleCloseModal()

            handleRefershSuggestions()
        })
    }

    const handleDeleteSuggestion = () => {
        handleErrors(async () => {
            await deleteSuggestion(suggestion.post, suggestion.id)

            handleRefershSuggestions()

            handleCloseModal()
        })
    }

    console.log(modal)

    return <section className="flex flex-col gap-4 p-2 fixed top-28 left-0">
        {suggestions && suggestions.map(suggestion => <Suggestion
                key={suggestion.id}
                openEditSuggestionModal={openEditSuggestionModal}
                openDeleteSuggestionModal={openDeleteSuggestionModal}
                suggestion={suggestion}
                user={user}
                page={'mySuggestions'}
            />
        )}
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
        {/* {modal && <GoToPost
            handleCloseModal={handleToggleModal}
        />} */}
    </section>
}