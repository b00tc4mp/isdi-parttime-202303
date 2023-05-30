import { createPost } from "../logic/createPost";
import { context } from "../ui";
import { useState } from "react";


export default function AddPost(props) {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseClick = () => {
    props.onCancel()
  }

  const handleImageUpload = (event) => {
    let file = event.target.files[0]
    if(file)
      setSelectedImage(URL.createObjectURL(file))
    else
      setSelectedImage(null)
  }

  const handleCreatePost = (event) => {
    event.preventDefault()

    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    try {
      const updatedSelectedImage = selectedImage
      createPost(context.userId, imageUrl, updatedSelectedImage, text)
      props.onCreatedPost()
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  return <div className="add-post container">
  <form className="add-post-form" onSubmit={handleCreatePost}>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus/>
      <input className="post-selected-image" type="file" name="postSelectedImage" accept="image/*" onChange={handleImageUpload}/>
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
      <button className="button">Create post</button>
      <button className="cancel-button button" type="button" onClick={handleCloseClick}>Canel</button>
  </form>
</div>
}