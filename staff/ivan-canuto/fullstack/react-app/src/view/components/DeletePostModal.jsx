import deletePost from "../../logic/deletePost"
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"
import Button from "../library/Button";
import { useAppContext } from "../hooks"
import { context } from "../../ui"

export default function DeletePost({ onDeletedPost, onCancel }) {
  const { alert } = useAppContext()

  const handleDeletePost = () => {
    try {
      deletePost(context.postId)
        .then(() => onDeletedPost())
        .catch(error => {
          alert(error.message, 'error')
          console.log(error.stack)
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