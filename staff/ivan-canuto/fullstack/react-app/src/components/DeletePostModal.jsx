import deletePost from "../logic/deletePost"
import { context } from "../ui"
import './components-styles/DeletePostModal.css'
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function DeletePost({ onDeletedPost, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

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
      <ModalWindow>
        <h2 className="text-2xl text-black">Do you want to delete this post?</h2>
        <div className="flex justify-around w-full">
          <Button className='text-lg px-5' onClick={handleDeletePost}>Delete</Button>
          <Button className='text-lg px-5' onClick={onCancel}>Cancel</Button>
        </div>
      </ModalWindow>
    </ModalContainer>
  </>
}