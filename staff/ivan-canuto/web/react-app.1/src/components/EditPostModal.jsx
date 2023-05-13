import { context } from "../ui";
import { updatePost } from "../logic/updatePost"
import { posts } from "../data";

export default function EditPost(props) {

  function onCancelClick() {
    props.onCloseModal()
  }

  function handleEditButton(event) {
    event.preventDefault()
    
    const postId = props.id
    const image = event.target.postImage.value
    const text = event.target.postText.value

    try {
      updatePost(context.userId, context.postId, image, text)
      props.renderPosts()
      props.onCloseModal()

    } catch (error) {
      alert(error)
      console.log(error);
    }
  }
  
  const post = posts().find(post => post.id === context.postId)
  
  return <div className="edit-post container">
  <form className="edit-post-form" onSubmit={handleEditButton}>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" defaultValue={post.image}/>
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10" defaultValue={post.text} autoFocus></textarea>
      <button className="button">Edit post</button>
      <button className="cancel-button button" type="button" onClick={onCancelClick}>Canel</button>
  </form>
</div>
}