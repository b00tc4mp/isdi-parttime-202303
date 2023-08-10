import { useEffect, useState } from "react"
import { ModalContainer, Button, ModalWindow } from "../library"
import { toggleVisibilityPost, retrievePost } from "../../logic"
import { useAppContext, useHandleErrors } from "../hooks"
import { context } from "../../ui"

export default function VisibilityPost({ onChangedVisibility, onCancel }) {
  const { alert } = useAppContext()
  const handleErrors = useHandleErrors()
  const [visible, setVisible] = useState()

  useEffect(() => {
    handleErrors(async () => {
      const post = await retrievePost(context.postId)

      setVisible(post.visible)
    })
  }, [])

  const handleToggleVisibility = () => {
    handleErrors(async () => {
      await toggleVisibilityPost(context.postId)

      setVisible(!visible)
      onChangedVisibility()
    })
  }
  
  return <>
  <ModalContainer className='fixed bg-black bg-opacity-20 top-0 left-0 z-30' onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
  }}>
    <ModalWindow className='w-11/12 h-96'>
      <h2 className="text-2xl text-black w-5/6 text-center">{`Do you want to set the post ${visible ? 'private' : 'public'} ?`}</h2>
      <img src="src/images/public-private.png" alt="public/private-image" />
      <div className="flex justify-evenly w-full">
        <Button className='text-lg px-5' onClick={handleToggleVisibility}>Yes</Button>
        <Button className='text-lg' onClick={onCancel}>Cancel</Button>
      </div>
    </ModalWindow>
  </ModalContainer>
  </>
}