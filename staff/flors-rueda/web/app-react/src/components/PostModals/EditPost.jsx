import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrievePost } from '../../logic/retrieve-post';
import { updatePost } from '../../logic/update-post';
import './PostModals.css';

export default function EditPostModal({ onCancel, postId, onPostUpdated}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
      try {
          retrievePost(context.userAuth, postId, (error, post) => {
              if (error) {
                console.log(`edit post error: ${error.message}`);
                return;
              }
              setPost(post);
              setSelectedImage(post.image)
          })
      } catch (error) {
        console.log(`edit post error: ${error.message}`);
      }
  }, [postId])

    const handleCancel = (event) => {
        event.preventDefault();
        onCancel();
    };

    const handleImageChange = (event) => {
      try{
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
      } catch {
        console.log(`edit post error: ${error.message}`);
      }

    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
    };

    const handleUpdatePost = (event) => {
        event.preventDefault();
        const image = selectedImage;

        const text = event.target.text.value;
        try {
            updatePost(text, image, postId, context.userAuth, error => {
              if(error) {
                console.log(`edit post submit error: ${error.message}`);
                return;
              }
              onPostUpdated();
            });
        } catch (error) {
            console.log(`edit post submit error: ${error.message}`);
        }
    };

    console.log('EditPostModal -> render');

    return   <section className="post-modal">
    <div className="post-modal__content">
      <div className="post-modal__header">
        <button className="post-modal__cancel" onClick={handleCancel}>
          X
        </button>
        <h2 className="post-modal__title">Edit Post</h2>
      </div>
      <div className="post-modal__body">
        {selectedImage ? <img className="post-modal__selected-image" src={selectedImage} alt="Selected Image"/> : null}
        <form className="post-modal__form" onSubmit={handleUpdatePost}>
          <div className="input__file" tabIndex="0">
            <button className="input__file-delete off">x</button>
            {/*TODO: clean code, put styles in css */}
            <svg
              className="post-modal__set-img"
              xmlns="http://www.w3.org/2000/svg"
              height="2rem"
              onClick={selectedImage ? handleDeleteImage : undefined}
              viewBox="0 96 960 960"
              width="2rem"
              fill="var(--color-primary-100)"
            >
              <path d={selectedImage ? svg.trash : svg.newImage} />
            </svg>
            <input
              className="post-modal__form-input--file"
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={handleImageChange}
            />
          </div>
          {post && (
            <>
              <textarea
                className="post-modal__form-input--textarea"
                name="text"
                type="text"
                maxLength="180"
                defaultValue={post.text}
              ></textarea>
              <button
                type="submit"
                className="post-modal__form--submit"
              >
                save
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  </section>

}