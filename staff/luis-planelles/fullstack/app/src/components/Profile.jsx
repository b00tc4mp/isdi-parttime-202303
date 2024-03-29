import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import retrieveUser from "../logic/retrieveUser";
import './Profile.css';


const Profile = ({onOpenEditProfile}) => {
  const { alert } = useAppContext()
  
  const [profileUser, setProfileUser] = useState(null)
    
    useEffect(() => {
      try {
        retrieveUser()
        .then(retrievedUser => setProfileUser(retrievedUser))
        .catch(error => alert(error))  
            
      } catch (error) {
        alert(error.message);
      }
    }, [profileUser]);
    
      
  const handleUpdateProfileModal = () => onOpenEditProfile()
    
    
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
          
        </div>
    </div>
  </div>
  </section>
}

export default Profile