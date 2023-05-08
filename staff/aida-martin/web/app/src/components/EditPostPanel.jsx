import { useState } from 'react'
import updatePost from '../logic/updatePost'
import { context } from '../ui'

export default function EditPostPanel ({ post, onPostEdited, onCancel }) {
  const [text, setText] = useState(post.text)
  const [image, setImage] = useState(post.image)

  function handleEditPost (event) {
    event.preventDefault()

    try {
      updatePost(context.userId, post.id, image, text)

      onPostEdited()
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleChangeText (event) {
    setText(event.target.value)
  }

  function handleChangeImage (event) {
    setImage(event.target.value)
  }

  function handleCancel (event) {
    event.preventDefault()

    onCancel()
  }

  return (
    <div className='edit-post-modal'>
      <form className='edit-post-form form' onSubmit={handleEditPost}>
        <h2>EDIT YOUR POST</h2>
        <input
          className='input'
          type='url'
          name='image'
          value={image}
          onChange={handleChangeImage}
          placeholder='Image url'
        />
        <textarea
          className='textarea'
          name='text'
          cols='30'
          rows='10'
          value={text}
          onChange={handleChangeText}
          placeholder='Text'
        />

        <p className='edit-post-error error off' />

        <button className='button' type='submit'>UPDATE</button>
        <button className='button cancel' type='button' onClick={handleCancel}>CANCEL</button>
      </form>
    </div>
  )
}
