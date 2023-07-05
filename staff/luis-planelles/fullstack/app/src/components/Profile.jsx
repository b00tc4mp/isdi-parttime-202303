import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui";
import './Profile.css';


const Profile = ({onOpenEditProfile, onOpenFavourites, onProfileImageClick}) => {
  const { alert } = useAppContext()
  
  const [profileUser, setProfileUser] = useState(null)
    
    useEffect(() => {
      try {
        retrieveUser(context.token, (error, retrievedUser) => {
          if (error) {
            alert(error.message);

            return;
          }
          
          setProfileUser(retrievedUser);
        });  
      } catch (error) {
        alert(error.message);
      }
    }, []);
    
      
  const handleUpdateProfileModal = () => onOpenEditProfile(),
    
  handleProfileFavourites = () => onOpenFavourites(),

  handleImageClick = () => {
  
    onProfileImageClick();
  };
    
  return <section className="profile-container">
    <div className="profile">
      <div className="profile-info">
        <div className="profile-info-header">
        {profileUser && <>
          <img className="profile-user-avatar" src={profileUser.avatar}/>
          <p className="profile-user-name">{profileUser.name}</p>
        </>}
          <button className="profile-edit-button" onClick={handleUpdateProfileModal}>
            <i className='far fa-pen'></i>
          </button>
          <button className='profile-favourites-button' onClick={handleProfileFavourites}>
            <i className='far fa-bookmark'></i> 
          </button>
        </div>
    </div>
  </div>
  </section>
}

export default Profile