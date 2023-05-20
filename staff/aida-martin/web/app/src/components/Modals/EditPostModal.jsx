import './EditPostModal.css'
import { useState, useEffect } from 'react'
import updatePost from '../../logic/updatePost'
import retrievePost from '../../logic/retrievePost'
import { context } from '../../ui'

export default function EditPostModal ({ postId, onPostEdited, onCancel }) {
  const [post, setPost] = useState(null)

  function handleEditPost (event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try {
      updatePost(context.userId, postId, image, text, (error) => {
        if (error) {
          console.log(error)

          return
        }
        onPostEdited()
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleCancel (event) {
    event.preventDefault()

    onCancel()
  }

  useEffect(() => {
    try {
      retrievePost(context.userId, postId, (error, post) => {
        if (error) {
          console.log(error.message)

          return
        }

        setPost(post)
      })
    } catch (error) {
      console.log(error.message)
    }
  }, [postId])

  return (
    <>
      {post &&
        <section className='modal'>
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
        </section>}
    </>
  )
}
