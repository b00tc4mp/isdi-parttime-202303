import { context } from "../ui";
import { updatePost } from "../logic/updatePost"
import retrievePost from "../logic/retrievePost";
import { useState } from "react";


export default function EditPost({ onCancel, onUpdatedPost }) {

  const [post, setPost] = useState()
  // const [selectedImage, setSelectedImage] = useState(null);

  const onCancelClick = () => {
    onCancel()
  }

  // const handleImageUpload = (event) => {
  //   let file = event.target.files[0]
  //   if(file)
  //     setSelectedImage(URL.createObjectURL(file))
  //   else
  //     setSelectedImage(null)
  // }

  const handleEditButton = (event) => {
    event.preventDefault()
    
    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    try {
      updatePost(context.userId, context.postId, imageUrl, text, (error) => {
        if(error) {
          alert(error.message)
          console.log(error.stack)

          return
        }
        
        onUpdatedPost()
      })

    } catch (error) {
      alert(error)
      console.log(error);
    }
  }
  
  try {
    retrievePost(context.userId, context.postId, (error, _post) => {
      if(error) {
        alert(error.message)
        console.log(error.stack)
        
        return
      }
      setPost(_post)
    })

  } catch (error) {
    
  }
  
  console.log('EditPost -> render');

  return <div className="edit-post container">
  <form className="edit-post-form" onSubmit={handleEditButton}>
      {post && <>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" defaultValue={post.image}/>
      <input className="post-selected-image" type="file" name="postSelectedImage" accept="image/*" onChange={handleImageUpload}/>
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10" defaultValue={post.text} autoFocus></textarea>
      </> || <>
      <input className="post-url" type="url" name="postImage" placeholder="Loading..." disabled/>
      <textarea className="post-text" name="postText" placeholder="Loading..." cols="30" rows="10" autoFocus disabled></textarea>
      </>}
      <button className="button">Edit post</button>
      <button className="cancel-button button" type="button" onClick={onCancelClick}>Canel</button>
  </form>
</div>
}