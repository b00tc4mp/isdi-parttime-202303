import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import retrievePostsUser from "../logic/retrievePostsUser";
import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui";
import './Profile.css';


const Profile = ({onOpenEditProfile, onOpenFavourites, onProfileImageClick}) => {
  const { alert } = useAppContext()
  
  const [postsUser, setPostsUser] = useState(null),
    [profileUser, setProfileUser] = useState(null)
    
    useEffect(() => {
      try {
        retrieveUser(context.userId, (error, retrievedUser) => {
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
    
    useEffect(() => {
      try {
        retrievePostsUser(context.userId, (error, postsUser) => {
          if (error) {
            alert(error.message);
          
            return;
          }
          
          setPostsUser(postsUser);
        });
      } catch (error) {
        alert(error.message);
      }
    }, [profileUser]);
    
      
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
        <div className="profile-posts">
          {postsUser && postsUser.map((post) => (
              <img
              className="profile-post-image"
              onClick={handleImageClick}
              key={post.id}
              src={post.image}
              />
          ))}
        </div>
    </div>
  </div>
  </section>
}

export default Profile