import { retrievePostSuggestions, createSuggestion, deleteSuggestion } from "../../logic"
import { useState } from "react"
import Comment from "./Comment"
import { Button, Form, ModalContainer } from "../library"
import { useAppContext } from "../hooks"
import { Suggestion } from '../components'

export default function Suggestions({ handleRefreshPost, post, user }) {
  const { alert } = useAppContext()

  const [addSuggestion, setAddSuggestion] = useState(false)
  const [suggestions, setSuggestions] = useState()

  useEffect(() => {
    const getSuggestions = async () => {
        const suggestions = await retrievePostSuggestions()

        setSuggestions(suggestions)
    }

    getSuggestions()
  })

  const toggleAddComment = () => {
    setAddSuggestion(!addSuggestion)
    document.body.classList.toggle('fixed-scroll')
  }

  function handleCreateSuggestion(event) {
    event.preventDefault()

    const commentText = event.target.commentText.value

    try {
      createComment(post.id, commentText)
        .then(() => {
          toggleAddComment()
          handleRefreshPost()
        })
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch(error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  const handleDeleteSuggestion = (commentId) => {
    try{
      deleteComment(post.id, commentId)
        .then(() => handleRefreshPost())
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

  return <>
    <section className="flex flex-col items-center w-full h-full py-4 px-1 pt-0">
      <div className="flex flex-col justify-around items-center h-full w-full">
        <h2 className="mt-2 mb-4 font-bold text-xl">Post comments</h2>
        <div className="flex flex-col overflow-scroll h-96 gap-2">
          {suggestions && suggestions.map(suggestion => <Suggesion
            key={suggestion.id}
            suggestion={suggestion}
            handleDeleteSuggestion={handleDeleteSuggestion}
          />
          )}
        </div>
        <Button className="mt-2" onClick={toggleAddComment}>Add comment</Button>
      </div>
      
      {addSuggestion &&
        <ModalContainer className='absolute top-0 bg-black bg-opacity-20' onClick={(event) => {
          if(event.target === document.querySelector('.ModalContainer'))
            toggleAddComment()
        }}>
          <Form className='bg-white h-96 p-4 w-5/6' onSubmit={handleCreateSuggestion}>
          <h2 className="text-lg">Add comment</h2>
            <textarea className="border-2 border-gray-200 rounded-md p-2 h-60" cols="30" rows="10" name="commentText" autoFocus></textarea>
            <div className="w-full flex justify-evenly">
              <Button className="bg-slate-100 w-14">Add</Button>
              <Button className='bg-slate-100' type="button" onClick={toggleAddComment}>Cancel</Button>
            </div>
          </Form>
        </ModalContainer>
      }
    </section>
  </>
}
