import ProfileCard from './ProfileCard';
import './Profile.css'
import Posts from '../posts/Posts';
import { useState, useEffect, useContext } from 'react';
import Settings from '../settings/Settings';
import { retrieveUser } from '../../logic/retrieve-user';
import inLogger from '../../inLogger';
import Context from '../../Context';
import { context } from '../../ui';

const Profile = ({ userId, onEditPost, onDeleteAccount }) => {
  const { alert } = useContext(Context);

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
          alert(`profile error: ${error.message}`, 'danger');
          setIsLoading(false);
          return;
        }
        setUser(user);
        setIsLoading(false);
      })
    } catch (error) {
      alert(`profile error: ${error.message}`, 'danger');
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  try {
    return (
      <section className={userId === context.userAuth ? "user-profile-logged" : "user-profile"}>
        <ProfileCard userId={userId} onSettingsClick={handleToggleSettings} selectedAvatar={selectedAvatar} isSettingsOn={view === 'settings'} user={user}/>
        {view === 'posts' && <Posts type={userId} userId={userId} onEditPost={onEditPost} />}
        {view === 'settings' && <Settings selectedAvatar={selectedAvatar} onAvatarChange={setSelectedAvatar} onDeleteAccount={onDeleteAccount} user={user}/>}
      </section>
    );
  } catch (error) {
    alert(`profile error: ${error.message}`, 'danger');
    return;
  }
}

export default inLogger(Profile)
