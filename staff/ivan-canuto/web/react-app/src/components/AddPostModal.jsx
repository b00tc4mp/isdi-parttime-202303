import { createPost } from "../logic/createPost";
import { context } from "../ui";
import Context from "../Context";
import { useContext } from "react";
import Container from "../library/Container";
import { useState } from "react";

export default function AddPost({ onCancel, onCreatedPost }) {
  const { alert, freeze, unfreeze } = useContext(Context)
  const [image, setImage] = useState()

  const handleCloseClick = () => {
    onCancel()
  }

  const handleCreatePost = (event) => {
    event.preventDefault()

    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    try {
      freeze()

      createPost(context.userId, imageUrl, text, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)

          return
        }
        
        onCreatedPost()
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error);
    }
  }

  const handleOnChangeEvent = (event) => {
    setImage(event.target.value)
  }

  console.log('AddPost -> render');

  return <Container tag='section' className="add-post" onClick={(event) => {
    if(event.target === document.querySelector('.Container'))
      onCancel()
  }}>
  <form className="add-post_form" onSubmit={handleCreatePost}>
      <h2>Add form</h2>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus onChange={handleOnChangeEvent}/>
      {image ? <img src={image}/> : ''}
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
      <button className="button">Create post</button>
      <button className="cancel-button button" type="button" onClick={handleCloseClick}>Canel</button>
  </form>
</Container>
}