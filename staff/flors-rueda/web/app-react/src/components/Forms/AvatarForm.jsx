import { useState, useRef } from 'react';
import { svg } from '../../../assets/svg-paths';
import { updateAvatar } from '../../logic/update-avatar';
import {context} from '../../context';
import './Form.css';

export default function AvatarForm({ onAvatarChange, onSaveClick }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [randomSelected, setSelectedRandom] = useState(false);
  const [avatarToSave, setAvatarToSave] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setSelectedImage(base64);
        onAvatarChange(base64);
        setAvatarToSave(base64)
        setSelectedRandom(false)
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(`original avatar error: ${error}`);
    }
  } else {
    try {
      const randomSrc = Math.random().toString(36).substring(7);
      setSelectedImage(null);
      onAvatarChange(randomSrc)
      setAvatarToSave(randomSrc)
      setSelectedRandom(true)
    } catch (error) {
      console.log(`random avatar error: ${error}`);
    }
  }
};

  const handleDeleteImage = () => {
    fileInputRef.current.value = null;
    setSelectedImage(null);
    onAvatarChange(null);
  };

  const handleSave = () => {
    try {
      if(avatarToSave) {
        const isRandom = selectedImage ? false : true;
        updateAvatar(isRandom, avatarToSave, context.userAuth, error => {
          if(error) {
            console.log(`update avatar error: ${error.message}`);
            return;
          }
          onSaveClick();
        })
      }
    } catch (error) {
      console.log(`update avatar error: ${error.message}`);
    }
  }

  return <article className="settings-form">
      <button className="settings-form--button" onClick={handleAvatarChange}>
        Randomize
      </button>
      <p>- - or - -</p>
      <form onSubmit={handleSave}>
        <div className="input__file" tabIndex="0">
          <svg className="settings-form__set-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" onClick={selectedImage ? handleDeleteImage : undefined} >
            <path d={selectedImage ? svg.trash : svg.newAvatar} />
          </svg>
          <input ref={fileInputRef} className="settings-form__form-input--file" type="file" name="image" accept=".jpg, .jpeg, .png, .webp" onChange={handleAvatarChange}/>
        </div>
        <div className="settings-form--save">
        <button type="submit" className="success">save</button>
        </div>
      </form>
    </article>
}
