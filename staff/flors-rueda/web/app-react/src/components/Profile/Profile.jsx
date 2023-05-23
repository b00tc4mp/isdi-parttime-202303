import ProfileCard from './ProfileCard';
import './Profile.css'
import Posts from '../Posts/Posts';
import { useState, useEffect } from 'react';
import Settings from '../Settings/Settings';
import { retrieveUser } from '../../logic/retrieve-user';
import inLogger from '../../logger';

const Profile = ({ userId, onEditPost, onDeleteAccount }) => {
  const [view, setView] = useState('posts');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleSettings = () => {
    setView((prevView) => (prevView === 'posts' ? 'settings' : 'posts'));
  }
  
  useEffect(() => {
    try {
      retrieveUser(userId, (error, user) => {
        if (error) {
          console.log(error.message);
          setIsLoading(false);
          return;
        }
        setUser(user);
        setIsLoading(false);
      })
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  try {
    return (
      <section className="user-profile">
        <ProfileCard userId={userId} onSettingsClick={handleToggleSettings} selectedAvatar={selectedAvatar} isSettingsOn={view === 'settings'} user={user}/>
        {view === 'posts' && <Posts type={userId} userId={userId} onEditPost={onEditPost} />}
        {view === 'settings' && <Settings selectedAvatar={selectedAvatar} onAvatarChange={setSelectedAvatar} onDeleteAccount={onDeleteAccount} user={user}/>}
      </section>
    );
  } catch (error) {
    console.log(`profile error: ${error.message}`);
    return <div>Error: {error.message}</div>;
  }
}

export default inLogger(Profile)
