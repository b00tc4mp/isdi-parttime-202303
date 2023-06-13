import { useState, useRef, useContext } from 'react';
import { svg } from '../../../public/svg-paths';
import updateAvatar from '../../logic/update-avatar';
import { context } from '../../ui';
import './Form.css';
import inLogger from '../../inLogger';
import Context from '../../Context';
import generateRandomAvatar from '../../logic/generate-random-avatar';

const AvatarForm = ({ onAvatarChange, onSaveClick, user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarToSave, setAvatarToSave] = useState(null);
  const fileInputRef = useRef(null);
  const { alert } = useContext(Context);

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
        alert(`original avatar error: ${error}`, 'danger');
      }
    } else {
      try {
        generateRandomAvatar((error, randomAvatar) => {
          if (error) {
            alert(`login error: ${error.message}`, 'danger');
            return;
          }
          onAvatarChange(randomAvatar);
          setAvatarToSave(randomAvatar)
        })
      } catch (error) {
        alert(`random avatar error: ${error}`, 'danger');
      }
    }
  };

  const handleDeleteImage = () => {
    fileInputRef.current.value = null;
    setSelectedImage(null);
    onAvatarChange(null);
  };

  const handleSave = (event) => {
    event.preventDefault()
    try {
      if (avatarToSave) {
        updateAvatar(avatarToSave, context.userAuth, error => {
          if (error) {
            alert(`update avatar error: ${error.message}`, 'danger');
            return;
          }
          onSaveClick();
        })
      }
    } catch (error) {
      alert(`update avatar error: ${error.message}`, 'danger');
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
        <input ref={fileInputRef} className="settings-form__form-input--file" type="file" name="image" accept=".jpg, .jpeg, .png, .webp" onChange={handleAvatarChange} />
      </div>
      <div className="settings-form--save">
        <button type="submit" className="success">save</button>
      </div>
    </form>
  </article>
}

export default inLogger(AvatarForm)