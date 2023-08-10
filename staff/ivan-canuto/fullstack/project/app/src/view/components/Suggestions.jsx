import { retrievePostSuggestions, createSuggestion, deleteSuggestion } from "../../logic"
import { useState, useEffect } from "react"
import { Button, Form, ModalContainer } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { Suggestion } from '../components'
import { context } from "../../ui"

export default function Suggestions({ handleRefreshPost, post, user }) {
  const { alert } = useAppContext()
  const handleErrors = useHandleErrors()

  const [addSuggestion, setAddSuggestion] = useState(false)
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
      handleErrors(async () => {
        const suggestions = await retrievePostSuggestions(post.id)
        
        setSuggestions(suggestions)
      })
  }, [])

  const toggleAddSuggestion = () => {
    setAddSuggestion(!addSuggestion)
    document.body.classList.toggle('fixed-scroll')
  }

  function handleCreateSuggestion(event) {
    event.preventDefault()

    const title = event.target.title.value
    const content = event.target.content.vallue

    handleErrors(async () => {
      await createSuggestion(post.id, title, content)

      toggleAddSuggestion()
      handleRefreshPost()
    })
  }
  
  const handleDeleteSuggestion = (suggestionId) => {
    handleErrors(async () => {
      await deleteSuggestion(post.id, suggestionId)

      handleRefreshPost()
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
            handleDeleteSuggestion={handleDeleteSuggestion}
            user={user}
          />
          )}
        </div>
        <Button className="mt-2" onClick={toggleAddSuggestion}>Add suggestion</Button>
      </div>
      
      {addSuggestion &&
        <ModalContainer className='absolute top-0 bg-black bg-opacity-20' onClick={(event) => {
          if(event.target === document.querySelector('.ModalContainer'))
            toggleAddSuggestion()
        }}>
          <Form className='bg-white h-96 p-4 w-5/6' onSubmit={handleCreateSuggestion}>
          <h2 className="text-lg">Add comment</h2>
            <textarea className="border-2 border-gray-200 rounded-md p-2 h-60" cols="30" rows="10" name="commentText" autoFocus></textarea>
            <div className="w-full flex justify-evenly">
              <Button className="bg-slate-100 w-14">Add</Button>
              <Button className='bg-slate-100' type="button" onClick={toggleAddSuggestion}>Cancel</Button>
            </div>
          </Form>
        </ModalContainer>
      }
    </section>
  </>
}
