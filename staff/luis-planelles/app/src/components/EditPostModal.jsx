import retrievePost from "../logic/retrievePost"
import updatePost from "../logic/updatePost"
import { context } from "../ui"


function EditPostModal({postId, onCancel, onPostUpdated}){
  let postEdit

  try {
    postEdit = retrievePost(postId)
  } catch(error){
    alert(error.message)
  }

  function handleEditUpdatePost(event){
    event.preventDefault()

    const imageEditForm = event.target.image.value,
    textEditForm = event.target.text.value

    try{
      updatePost(context.userId, postEdit.id, imageEditForm, textEditForm)
  
      onPostUpdated()
    } catch (error){
      alert(error.message)
    }
  }

  function handleCancelEditPost(){
    onCancel()
  }
    
  return <section className="edit-post container">
      <form className="container" onSubmit={handleEditUpdatePost}>
        <input className="input" type="hidden" name="postId" defaultValue={postEdit.id}/>
        <input className="input" type="url" name="image" placeholder="image url" defaultValue={postEdit.image}/>
        <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={postEdit.text}></textarea>
        <button className="button edit" type="submit">edit</button>
        <button className="button cancel" onClick={handleCancelEditPost} type="button">Cancel</button>
      </form>
    </section>
}

export default EditPostModal