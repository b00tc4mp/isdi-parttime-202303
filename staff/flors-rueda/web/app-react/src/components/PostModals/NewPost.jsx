import { svg } from '../../../assets/svg-paths'
import { context } from '../../context' 
import { uploadPost } from '../../logic/upload-post';
import { useState } from 'react';
import './PostModals.css'

export default function NewPostModal({ onCancel, onPostCreated }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCancel = (event) => {
        event.preventDefault();
        onCancel();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage({
              file: file,
              base64: reader.result,
            });
          };
          reader.readAsDataURL(file);
        } else {
          setSelectedImage(null);
        }
      };

      const handleDeleteImage = (event) => {
        setSelectedImage(null);
      }

    const handleCreatePost = (event) => {
        event.preventDefault();
        const image = selectedImage.base64;
        const text = event.target.text.value;

        try {
            uploadPost(image, text, context.userAuth);
            onPostCreated();
        } catch(error) {
            console.log(`new post error: ${error.message}`);
        }
    }

    console.log('NewPostModal -> render');

    return <section className="post-modal">
            <div className="post-modal__content">
                <div className="post-modal__header">
                    <button className="post-modal__cancel" onClick={handleCancel}>X</button>
                    <h2 className="post-modal__title">Create Post</h2>
                </div>
                <div className="post-modal__body">
                {selectedImage ?
            <img
              className="post-modal__selected-image"
              src={selectedImage.base64}
              alt="Selected Image"
            /> :
            <img
              className="post-modal__selected-image"
              src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg"
              alt="Selected Image"
            /> 
          }
                  
                    <form className="post-modal__form" onSubmit={handleCreatePost}>
                        <div className="input__file" tabindex="0">
                            <button className="input__file-delete off">x</button>
                            {/*TODO: clean code, put styles in css */}
                            <svg className="post-modal__set-img" xmlns="http://www.w3.org/2000/svg" height="2rem"
                                onClick={selectedImage ? handleDeleteImage : undefined} viewBox="0 96 960 960" width="2rem" fill="var(--color-primary-100)">
                                <path d={selectedImage ? svg.trash : svg.newImage} />
                            </svg>
                            <input className="post-modal__form-input--file" type="file" name="image"
                                accept=".jpg, .jpeg, .png, .webp" onChange={handleImageChange}/>
                        </div>
                        <textarea className="post-modal__form-input--textarea" name="text" type="text" maxlength="180"
                            placeholder="max 180 chars"></textarea>
                        <button type="submit" className="post-modal__form--submit">send</button>
                    </form>
                </div>
            </div>
        </section>
}

