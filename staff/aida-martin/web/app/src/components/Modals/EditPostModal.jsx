import './editPostModal.css'
import updatePost from '../../logic/updatePost'
import { context } from '../../ui'

export default function EditPostModal ({ post, onPostEdited, onCancel }) {
  function handleEditPost (event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      updatePost(context.userId, post.id, image, text)

      onPostEdited()
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleCancel (event) {
    event.preventDefault()

    onCancel()
  }

  return (
    <div className='modal'>
      <form className='form-window edit-post-form form' onSubmit={handleEditPost}>
        <h2>EDIT YOUR POST</h2>
        <input
          className='input'
          type='url'
          name='image'
          defaultValue={post.image}
          placeholder='Image url'
        />
        <textarea
          className='textarea'
          name='text'
          cols='30'
          rows='10'
          defaultValue={post.text}
          placeholder='Text'
        />

        <p className='edit-post-error error off' />

        <button className='button' type='submit'>UPDATE</button>
        <button className='button cancel' type='button' onClick={handleCancel}>CANCEL</button>
      </form>
    </div>
  )
}
