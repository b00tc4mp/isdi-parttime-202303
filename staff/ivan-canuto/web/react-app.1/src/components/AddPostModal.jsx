import { createPost } from "../logic/createPost";
import { context } from "../ui";

export default function AddPost(props) {

  function handleCloseClick() {
    props.onCancel()
  }

  function handleCreatePost(event) {
    event.preventDefault()

    const image = event.target.postImage.value
    const text = event.target.postText.value

    try {
      createPost(context.userId, image, text)
      props.onCancel()
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  return <div className="add-post container">
  <form className="add-post-form" onSubmit={handleCreatePost}>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus/>
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
      <button className="button">Create post</button>
      <button className="cancel-button button" type="button" onClick={handleCloseClick}>Canel</button>
  </form>
</div>
}