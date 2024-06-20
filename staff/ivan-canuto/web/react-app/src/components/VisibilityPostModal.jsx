import { useEffect, useState } from "react"
import { findPostById } from "../data"
import { context } from "../ui"
import './components-styles/VisibilityPostModal.css'
import ModalContainer from "../library/ModalContainer"
import toggleVisibilityPost from "../logic/toggleVisibilityPost"
import Context from "../Context"
import { useContext } from "react"
import ModalWindow from "../library/ModalWindow"

export default function VisibilityPost({ onChangedVisibility, onCancel }) {
  const { alert, freeze, unfreeze } = useContext(Context)
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
      <h2>{`Do you want to set the post ${visible ? 'private' : 'public'} ?`}</h2>
      <div className="toggle-visibility_buttons">
        <button onClick={handleToggleVisibility}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </ModalWindow>
  </ModalContainer>
  </>
}