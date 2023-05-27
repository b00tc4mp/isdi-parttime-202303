import { createPost } from "../logic/createPost";
import { context } from "../ui";
import Context from "../Context";
import { useContext } from "react";
import Container from "../library/Container";


export default function AddPost({ onCancel, onCreatedPost }) {
  const { alert, freeze, unfreeze } = useContext(Context)

  // const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseClick = () => {
    onCancel()
  }

  // const handleImageUpload = (event) => {
  //   let file = event.target.files[0]
  //   if(file) {
  //       setSelectedImage(URL.createObjectURL(file))
  //     console.debug(URL.createObjectURL(file))
  //   } else
  //     setSelectedImage(null)
  // }

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

  return <Container tag='section' className="add-post" onClick={(event) => {
    if(event.target === document.querySelector('.Container'))
      onCancel()
  }}>
  <form className="add-post_form" onSubmit={handleCreatePost}>
      <h2>Add form</h2>
      <input className="post-url" type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus/>
      {/* <input className="post-selected-image" type="file" name="postSelectedImage" accept="image/*" onChange={handleImageUpload}/> */}
      <textarea className="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
      <button className="button">Create post</button>
      <button className="cancel-button button" type="button" onClick={handleCloseClick}>Canel</button>
  </form>
</Container>
}