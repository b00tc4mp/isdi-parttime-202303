import { createComment, deleteComment, retrieveUser } from "../../logic"
import { useState, useEffect } from "react"
import Comment from "./Comment"
import { Button, Form, ModalContainer } from "../library"
import { useAppContext } from "../hooks"

export default function Comments({ onCloseCommentModal, handleRefreshPosts, post }) {
  const { alert } = useAppContext()

  const [addComment, setAddComment] = useState(false)
  const [user, setUser] = useState()

  const handleCloseCommentModal = () => {
    onCloseCommentModal()
  }

  const toggleAddComment = () => {
    setAddComment(!addComment)
    document.body.classList.toggle('fixed-scroll')
  }

  useEffect(() => {
    try {
      retrieveUser()
        .then(setUser)
        .catch(error => {
          alert(error.message)
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }, [])

  function handleCreateComment(event) {
    event.preventDefault()

    const commentText = event.target.commentText.value

    try {
      createComment(post.id, commentText)
        .then(() => {
          toggleAddComment()
          handleRefreshPosts()
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
  
  const handleDeleteComment = (commentId) => {
    try{
      deleteComment(post.id, commentId)
        .then(() => handleRefreshPosts())
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
    <section className="flex flex-col items-center w-full h-full p-4">
      <div className="flex justify-between w-full">
        <div className="flex">
          <img className="h-6 rounded-full" src={post.author.avatar} alt="post-user-avatar"/>
          <p className=" mx-2">{post.author.name}</p>
        </div>
        <Button className="h-8" onClick={handleCloseCommentModal}>Return</Button>
      </div>

      <h2 className="mt-2 mb-4 font-bold text-lg">Post comments</h2>

      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-col overflow-hidden">
          {user && post.comments && post.comments.map(comment => <Comment
            key={comment.id}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            user={user}
          />
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button className="" onClick={toggleAddComment}>Add comment</Button>
        </div>
      </div>
      
      {addComment &&
        <ModalContainer onClick={(event) => {
          if(event.target === document.querySelector('.ModalContainer'))
            toggleAddComment()
        }}>
          <Form className='bg-white h-72 py-4' onSubmit={handleCreateComment}>
          <h2 className="text-lg">Add comment</h2>
            <textarea className="border-2 border-gray-200 rounded-md p-2" cols="30" rows="10" name="commentText" autoFocus></textarea>
            <div className="w-full flex justify-evenly">
              <Button className="w-14">Add</Button>
              <Button type="button" onClick={toggleAddComment}>Cancel</Button>
            </div>
          </Form>
        </ModalContainer>
      }
    </section>
  </>
}
