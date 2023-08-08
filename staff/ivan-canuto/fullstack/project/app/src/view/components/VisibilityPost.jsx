import { useEffect, useState } from "react"
import { ModalContainer, Button, ModalWindow } from "../library"
import { toggleVisibilityPost, retrievePost } from "../../logic"
import { useAppContext } from "../hooks"
import { context } from "../../ui"

export default function VisibilityPost({ onChangedVisibility, onCancel }) {
  const { alert } = useAppContext()
  const [visible, setVisible] = useState()

  useEffect(() => {
    try {
      freeze()

      retrievePost(context.postId)
        .then(post => {
          unfreeze()
          setVisible(post.visible)
        })
        .catch(error => {
          unfreeze()
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }, [])

  const handleToggleVisibility = () => {
    try {
      toggleVisibilityPost(context.postId)
        .then(() => {
          setVisible(!visible)
          onChangedVisibility()
        })
        .catch(error => {
          alert(error.message, 'error')
          console.log(error.stack)
        })
      
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack)
    }
  }
  
  return <>
  <ModalContainer onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
  }}>
    <ModalWindow>
      <h2 className="text-xl text-black">{`Do you want to set the post ${visible ? 'private' : 'public'} ?`}</h2>
      <div className="flex justify-evenly w-full">
        <Button className='text-lg px-5' onClick={handleToggleVisibility}>Yes</Button>
        <Button className='text-lg' onClick={onCancel}>Cancel</Button>
      </div>
    </ModalWindow>
  </ModalContainer>
  </>
}