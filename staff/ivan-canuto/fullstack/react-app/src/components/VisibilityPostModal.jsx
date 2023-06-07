import { useEffect, useState } from "react"
import { findPostById } from "../data"
import { context } from "../ui"
import './components-styles/VisibilityPostModal.css'
import ModalContainer from "../library/ModalContainer"
import toggleVisibilityPost from "../logic/toggleVisibilityPost"
import ModalWindow from "../library/ModalWindow"
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function VisibilityPost({ onChangedVisibility, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()
  const [visible, setVisible] = useState()

  useEffect(() => {
    freeze()

    findPostById(context.postId, post => {
      unfreeze()

      setVisible(post.visible)
    })
  }, [])

  const handleToggleVisibility = () => {
    try {
      freeze()
      
      toggleVisibilityPost(context.postId, (error, newVisibleState) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.log(error.stack)
          
          return
        }
        setVisible(newVisibleState)
        onChangedVisibility()
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
      <h2 className="text-xl">{`Do you want to set the post ${visible ? 'private' : 'public'} ?`}</h2>
      <div className="flex justify-around w-full">
        <Button className='text-lg px-5' onClick={handleToggleVisibility}>Yes</Button>
        <Button className='text-lg px-5' onClick={onCancel}>Cancel</Button>
      </div>
    </ModalWindow>
  </ModalContainer>
  </>
}