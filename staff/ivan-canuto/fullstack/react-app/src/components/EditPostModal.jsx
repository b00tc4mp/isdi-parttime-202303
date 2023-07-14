import { updatePost } from "../logic/updatePost"
import retrievePost from "../logic/retrievePost"
import { useEffect, useState } from "react"
import ModalContainer from "../library/ModalContainer"
import Button from "../library/Button";
import Input from "../library/Input";
import Form from "../library/Form"
import { useAppContext } from "../hooks"
import { context } from "../ui"

export default function EditPost({ onCancel, onUpdatedPost }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [post, setPost] = useState()

  const handleEditButton = (event) => {
    event.preventDefault()
    
    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    try {
      updatePost(context.postId, imageUrl, text)
        .then(() => onUpdatedPost())
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack);
    }
  }
  
  useEffect(() => {
    try {
      freeze()

      retrievePost(context.postId)
        .then(_post => {
          unfreeze()
          
          console.log(_post)
          setPost(_post)
        })
        .catch(error => {
          unfreeze()

          alert(error.message, 'error')
          console.debug(error.stack)
        })
      
    } catch (error) {
      unfreeze()

      alert(error.message, 'error')
      console.log(error.stack);
    }
  }, [])
  
  console.debug('EditPost -> render');

  return <>
    <ModalContainer tag='section' onClick={(event) => {
      if(event.target === document.querySelector('.ModalContainer'))
        onCancel()
    }}>
      <Form className='bg-white w-96 py-4' onSubmit={handleEditButton}>
        <h2 className="text-black">Edit post</h2>
        {post && <>
          <Input type="url" name="postImage" placeholder="URL Image" defaultValue={post.image}/>
          <img src={post.image}/>
          <textarea className="text-black w-full p-2 h-40 border-gray-200 border-2 rounded-lg" name="postText" placeholder="Post text" cols="30" rows="10" defaultValue={post.text}></textarea>
          </> || <>
          <Input type="url" name="postImage" placeholder="Loading..." disabled/>
          <textarea className="text-black w-full p-2 h-40 border-gray-200 border-2 rounded-lg" name="postText" placeholder="Loading..." cols="30" rows="10" disabled></textarea>
        </>}
        <div className="w-full justify-center gap-4 flex">
          <Button className="px-4">Edit</Button>
          <Button type="button" onClick={onCancel}>Canel</Button>
        </div>
      </Form>
    </ModalContainer>
  </>
}