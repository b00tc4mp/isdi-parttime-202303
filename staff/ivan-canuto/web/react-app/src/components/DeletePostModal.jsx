import deletePost from "../logic/deletePost"
import { context } from "../ui"
import Context from "../Context"
import { useContext } from "react"
import './components-styles/DeletePostModal.css'
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"

export default function DeletePost({ onDeletedPost, onCancel }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const handleDeletePost = () => {
    try {
      freeze()

      deletePost(context.postId, context.userId, error => {
        unfreeze()
        
        if (error) {
        alert(error.message, 'error')
        console.log(error.stack)

        return
      }
      
        onDeletedPost()
      })
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack);
    }
  }

  return <>
    <ModalContainer onClick={(event) => {
      if (event.target === document.querySelector('.ModalContainer'))
        onCancel()
    }}>
      <ModalWindow className="delete-post_modal">
        <h2>Do you want to delete this post?</h2>
        <div className="delete-post_buttons">
          <button className="delete-post_button" onClick={handleDeletePost}>Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </ModalWindow>
    </ModalContainer>
  </>
}