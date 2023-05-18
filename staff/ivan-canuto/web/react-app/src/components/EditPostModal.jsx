import { context } from "../ui";
import { updatePost } from "../logic/updatePost"
import retrievePost from "../logic/retrievePost";


export default function EditPost({ onCancel, onUpdatedPost }) {

  const onCancelClick = () => {
    onCancel()
  }

  const handleEditButton = (event) => {
    event.preventDefault()
    
    const image = event.target.postImage.value
    const text = event.target.postText.value

    try {
      updatePost(context.userId, context.postId, image, text, (error) => {
        if(error.message) {
          alert(error)
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
  
  let post;
  retrievePost(context.userId, context.postId, (error, _post) => {
    if(error.message) {
      alert(error)
      console.log(error.stack)

      return
    }
    post = _post
  })
  
  return <div className="edit-post container">
  <form className="edit-post-form" onSubmit={handleEditButton}>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" defaultValue={post.image}/>
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10" defaultValue={post.text} autoFocus></textarea>
      <button className="button">Edit post</button>
      <button className="cancel-button button" type="button" onClick={onCancelClick}>Canel</button>
  </form>
</div>
}