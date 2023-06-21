import createComment from "../logic/createComment"
import { useState } from "react"
import deleteComment from "../logic/deleteComment"
import Comment from "./Comment"
import './components-styles/Comments.css'
import { context } from "../ui"
import Button from "../library/Button";
import Form from "../library/Form";
import ModalContainer from "../library/ModalContainer"
import { useAppContext } from "../hooks"

export default function Comments({ onCloseCommentModal, handleRefreshPosts, post }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [addComment, setAddComment] = useState(false)

  const handleCloseCommentModal = () => {
    onCloseCommentModal()
  }

  const toggleAddComment = () => {
    setAddComment(!addComment)
  }

  function handleCreateComment(event) {
    event.preventDefault()

    const commentText = event.target.commentText.value

    try {
      freeze()
      
      createComment(commentText, context.userId, post.id, (error) => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        toggleAddComment()
        handleRefreshPosts()
      })

    } catch(error) {
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  const handleDeleteComment = (post, commentId) => {
    try{
      freeze()

      deleteComment(post.id, commentId, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
      })

    } catch (error) {
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

  return <>
    <section className="flex flex-col items-center h-80">
      <div className="flex justify-between w-full">
        <div>
          <img className="h-6 rounded-full" src={post.author.avatar} alt="post-user-avatar" />
          <p className=" mx-2">{post.author.name}</p>
        </div>
        <Button className="h-8" onClick={handleCloseCommentModal}>Return</Button>
      </div>

      <h2 className="mt-2 mb-4 font-bold text-lg">Post comments</h2>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col overflow-hidden">
          {post.comments && post.comments.map(comment => <Comment
            key={comment.id}
            comment={comment}
            post={post}
            handleDeleteComment={handleDeleteComment}/>
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
