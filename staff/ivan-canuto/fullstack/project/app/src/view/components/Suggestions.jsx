import { retrievePostSuggestions, createSuggestion, deleteSuggestion, retrieveSuggestion, updateSuggestion } from "../../logic"
import { useState, useEffect } from "react"
import { Button } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { Suggestion } from '../components'
import { context } from "../../ui"
import { CreateSuggestion, DeleteSuggestion, UpdateSuggestion } from '../components'

export default function Suggestions({ handleRefreshPost, post, user }) {
  const { alert } = useAppContext()
  const handleErrors = useHandleErrors()

  const [modal, setModal] = useState()
  const [suggestion, setSuggestion] = useState()
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    handleRefreshSuggestions()
  }, [])

  const handleRefreshSuggestions = () => {
    handleErrors(async () => {
      const suggestions = await retrievePostSuggestions(post.id)
      
      setSuggestions(suggestions)
    })
  }

  const openCreateSuggestionModal = () => setModal('addSuggestion')

  const openEditSuggestionModal = () => {
    setModal('updateSuggestion')

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
    })
  }

  const handleUpdateSuggestion = event => {
    event.preventDefault()

    const title = event.target.title.value
    const content = event.target.content.value

    handleErrors(async () => {
      await updateSuggestion(context.suggestionId, title, content)

      handleRefreshSuggestions()
      handleCloseModal()
      setSuggestion(null)
    })
  }

  return <>
    <section className="flex flex-col items-center w-full h-full py-4 px-1 pt-0">
      <div className="flex flex-col justify-evenly items-center h-full w-full">
        <h2 className="mt-2 mb-4 font-bold text-xl">Suggestions</h2>
        <div className="flex flex-col overflow-scroll h-96 gap-2">
          {suggestions && suggestions.map(suggestion => <Suggestion
            key={suggestion.id}
            suggestion={suggestion}
            openDeleteSuggestionModal={openDeleteSuggestionModal}
            openEditSuggestionModal={openEditSuggestionModal}
            user={user}
          />
          )}
        </div>
        <Button className="mt-2" onClick={openCreateSuggestionModal}>Add suggestion</Button>
      </div>
      
      {modal === 'addSuggestion' && <CreateSuggestion
        handleCreateSuggestion={handleCreateSuggestion}
        handleCloseModal={handleCloseModal}
      />}

      {modal === 'updateSuggestion' && <DeleteSuggestion
        handleDeleteSuggestion={handleDeleteSuggestion}
        handleCloseModal={handleCloseModal}
      />}

      {modal === 'deleteSuggestion' && <UpdateSuggestion
        handleUpdateSuggestion={handleUpdateSuggestion}
        handleCloseModal={handleCloseModal}
        suggestion={suggestion}
      />}
    </section>
  </>
}
