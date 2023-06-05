import { createPost } from "../logic/createPost";
import { context } from "../ui";
import Context from "../Context";
import { useContext } from "react";
import { useState } from "react";
import { ImageCompressor } from 'image-compressor'
import Form from "../library/Form";
import ModalContainer from "../library/ModalContainer";
import Input from "../library/Input";
import Button from "../library/Button";
import Textarea from "../library/Textarea";

export default function AddPost({ onCancel, onCreatedPost }) {
  const { alert, freeze, unfreeze } = useContext(Context)
  const [image, setImage] = useState()
  const [selectedImage, setSelectedImage] = useState()

  const handleCloseClick = () => {
    onCancel()
  }

  const handleCreatePost = (event) => {
    event.preventDefault()

    const imageUrl = event.target.postImage.value
    const text = event.target.postText.value

    if(imageUrl && selectedImage) {
      alert('You can only enter an image in one field.', 'error')
      return
    }

    let image;
    if(imageUrl && !selectedImage) image = imageUrl
    if(selectedImage && !imageUrl) image = selectedImage

    try {
      freeze()

      createPost(context.userId, image, text, (error) => {
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
      unfreeze()
      alert(error.message, 'error')
      console.debug(error);
    }
  }

  const handleOnChangeEvent = (event) => {
    setImage(event.target.value)
  }

  const handleSelectImage = async (event) => {
    const file = event.target.files[0]

    if(!file) return
    else {
      
      const reader = new FileReader()
      
      reader.onload = () => {
          console.log(reader.result)

          const imageCompressor = new ImageCompressor
      
          const compressorSettings = {
            toWidth : 300,
            toHeight : 300,
            mimeType : 'image/png',
            mode : 'strict',
            quality : 1
        }
      
          imageCompressor.run(reader.result, compressorSettings, (compressedSrc) => {
            console.log(compressedSrc);
            setSelectedImage(compressedSrc)
          })
        }

      reader.onerror = () => console.log(reader.error)
      reader.readAsDataURL(file)
    }
  }

  console.log('AddPost -> render');

  return <ModalContainer tag='section'onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
  }}>
  <Form className="bg-white p-4 rounded-lg" onSubmit={handleCreatePost}>
      <h2>Add post</h2>
      <Input type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus onChange={handleOnChangeEvent}/>
      <Input name="selectedImage" type="file" accept="image/*" onChange={handleSelectImage}/>
      {image ? <canvas className="canvas" src={image}/> : ''}
      <Textarea name="postText" placeholder="Post text" cols="30" rows="10"></Textarea>
      <div className="w-full justify-center gap-4">
        <Button classNamButtone="button">Create post</Button>
        <Button type="button" onClick={handleCloseClick}>Canel</Button>
      </div>
  </Form>
</ModalContainer>
}