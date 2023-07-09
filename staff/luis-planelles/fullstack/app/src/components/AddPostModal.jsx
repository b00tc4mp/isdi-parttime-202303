import { useAppContext } from '../hooks';
import createPost from '../logic/createPost';
import { context } from '../ui';

const AddPostModal = ({ onCancel, onPostCreate }) => {
  const { alert } = useAppContext()

  const handleCancelAddPost = (event) => {
    event.preventDefault()

    onCancel()
  },

  handleCreatePost = (event) => {
    event.preventDefault()

    const image = event.target.image.value,
      text = event.target.text.value;

    try {
      createPost(context.token, image, text)
      .then(()=> onPostCreate())
      .catch(error => alert(error.message))

    } catch (error) {
        alert(error.message)
    }
  };

  return <section className="add-post container">
      <form className="container" onSubmit={handleCreatePost}>
          <input className="input" type="url" name="image" placeholder="image url" />
          <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
          <button className="button" type="submit">Create</button>
          <button className="button cancel" type="button" onClick={handleCancelAddPost}>Cancel</button>
      </form>
  </section>
}

export default AddPostModal