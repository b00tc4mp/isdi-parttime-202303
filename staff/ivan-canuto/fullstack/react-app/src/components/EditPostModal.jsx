import { context } from "../ui"
import { updatePost } from "../logic/updatePost"
import retrievePost from "../logic/retrievePost"
import { useEffect, useState } from "react"
import Context from "../Context"
import { useContext } from "react"
import Container from "../library/Container"
import ModalWindow from "../library/ModalWindow"

export default function EditPost({ onCancel, onUpdatedPost }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  const [post, setPost] = useState()

  const handleEditButton = (event) => {
    event.preventDefault()
    
    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    try {
      freeze()

      updatePost(context.userId, context.postId, imageUrl, text, (error) => {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        
        onUpdatedPost()
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  useEffect(() => {
    try {
      freeze()

      retrievePost(context.userId, context.postId, (error, _post) => {
        unfreeze()

        if(error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          
          return
        }
        setPost(_post)
      })
      
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack);
    }
  }, [])
  
  console.debug('EditPost -> render');

  return <>
    <Container tag='section' className="edit-post" onClick={(event) => {
      if(event.target === document.querySelector('.Container'))
        onCancel()
    }}>
      <ModalWindow tag='form' className="edit-post_form" onSubmit={handleEditButton}>
        <h2 className="edit-form_text">Edit post</h2>
        {post && <>
          <input className="post-url" type="url" name="postImage" placeholder="URL Image" defaultValue={post.image}/>
          <img className="post-image" src={post.image}/>
          <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10" defaultValue={post.text} autoFocus></textarea>
          </> || <>
          <input className="post-url" type="url" name="postImage" placeholder="Loading..." disabled/>
          <textarea className="post-text" name="postText" placeholder="Loading..." cols="30" rows="10" autoFocus disabled></textarea>
        </>}
        <div className="edit-post-form_buttons">
          <button className="button">Edit post</button>
          <button className="cancel-button button" type="button" onClick={onCancel}>Canel</button>
        </div>
      </ModalWindow>
    </Container>
  </>
}