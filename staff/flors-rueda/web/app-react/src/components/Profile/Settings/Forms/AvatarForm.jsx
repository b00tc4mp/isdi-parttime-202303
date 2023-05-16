import { useState } from 'react';
import { svg } from '../../../../../assets/svg-paths';
import { updateAvatar } from '../../../../logic/update-avatar';
import {context} from '../../../../context';
import './Form.css';

export default function AvatarForm({ onAvatarChange, onSaveClick }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarToSave, setAvatarToSave] = useState(null);

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
    } catch (error) {
      console.log(`random avatar error: ${error}`);
    }
  }
};

  const handleDeleteImage = () => {
    setSelectedImage(null);
    onAvatarChange(null);
  };

  const handleSave = (event) => {
    event.preventDefault();
    const isRandom = selectedImage ? false : true;
    updateAvatar(isRandom, avatarToSave, context.userAuth)
    onSaveClick();
  }

  return <article className="settings-form">
      <button className="settings-form--button" onClick={handleAvatarChange}>
        Randomize
      </button>
      <form onSubmit={handleSave}>
        <div className="input__file" tabIndex="0">
          <svg
            className="settings-form__set-img"
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
            className="settings-form__form-input--file"
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="settings-form--save">
        <button type="submit">save</button>
        </div>
      </form>
    </article>
}
