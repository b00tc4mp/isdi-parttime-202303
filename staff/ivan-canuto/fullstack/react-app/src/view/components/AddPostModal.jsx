import { createPost } from "../../logic/createPost";
import { useState } from "react";
import { ImageCompressor } from 'image-compressor'
import Form from "../library/Form";
import ModalContainer from "../library/ModalContainer";
import Input from "../library/Input";
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function AddPost({ onCancel, onCreatedPost }) {
  const { alert } = useAppContext()
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
      createPost(image, text)
      .then(() => {
        onCreatedPost()
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(error => {
        alert(error.message, 'error')
        console.debug(error.stack)
      })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error);
    }
  }

  const handleOnChangeEvent = (event) => {
    if(event.target.value)
      setImage(event.target.value)
  }

  const handleSelectImage = async (event) => {
    const file = event.target.files[0]

    if(!file) {
      setImage()

      return
    }
    else {
      
      const reader = new FileReader()
      
      reader.onload = () => {
          const imageCompressor = new ImageCompressor
      
          const compressorSettings = {
            toWidth : 200,
            toHeight : 200,
            mimeType : 'image/png',
            mode : 'strict',
            quality : 1
        }
      
          imageCompressor.run(reader.result, compressorSettings, (compressedSrc) => {
            setSelectedImage(compressedSrc)
            setImage(compressedSrc)
          })
        }

      reader.onerror = () => console.log(reader.error)
      reader.readAsDataURL(file)
    }
  }

  console.log('AddPost -> render');

  return <ModalContainer tag='section' onClick={(event) => {
    if(event.target === document.querySelector('.ModalContainer'))
      onCancel()
    }}>
    <Form className='bg-white' onSubmit={handleCreatePost}>
        <h2 className="text-black text-lg">Add post</h2>
        <Input type="url" name="postImage" placeholder="URL Image" autoComplete="off" autoFocus onChange={handleOnChangeEvent}/>
        <Input name="selectedImage" type="file" accept="image/*" onChange={handleSelectImage}/>
        {image ? <img className="max-h-60" src={image}/> : ''}
        <textarea className="w-full p-2 border-2 text-black border-gray-200 rounded-lg h-40" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
        <div className="w-full justify-center gap-4 flex">
          <Button className='m-2'>Create post</Button>
          <Button className='m-2' type="button" onClick={handleCloseClick}>Canel</Button>
        </div>
    </Form>
  </ModalContainer>
}