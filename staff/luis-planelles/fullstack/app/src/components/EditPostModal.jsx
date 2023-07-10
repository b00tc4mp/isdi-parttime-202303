import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import retrievePost from "../logic/retrievePost";
import updatePost from "../logic/updatePost";
import { context } from "../ui";

const EditPostModal = ({postId, onCancel, onPostUpdated}) => {
  const { alert } = useAppContext()
  
  const [postEdit, setPostEdit] = useState(null)

  useEffect(() => {
    try {
      retrievePost(context.token, postId)
      .then((retrievedPost) => setPostEdit(retrievedPost))
      .catch(error => alert(error))

    } catch(error){
        alert(error.message)
    }
  }, [])
    
  const handleCancelEditPost = () => {
    onCancel()
  },

  handleEditUpdatePost = (event) => {
    event.preventDefault()

    const imageEditForm = event.target.image.value,
      textEditForm = event.target.text.value

    try{
      updatePost(context.token, postId, imageEditForm, textEditForm)
      .then(()=> onPostUpdated())

    } catch (error){
      alert(error.message)
    }
  }

return <>
    {postEdit && <section className="edit-post container">
        <form className="container" onSubmit={handleEditUpdatePost}>
          <input className="input" type="hidden" name="postId" defaultValue={postEdit.id}/>
          <input className="input" type="url" name="image" placeholder="image url" defaultValue={postEdit.image}/>
          <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={postEdit.text}></textarea>
          <button className="button edit" type="submit">edit</button>
          <button className="button cancel" onClick={handleCancelEditPost} type="button">Cancel</button>
        </form>
      </section>}
  </>
}

export default EditPostModal