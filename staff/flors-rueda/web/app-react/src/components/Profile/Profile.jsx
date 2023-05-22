import ProfileCard from './ProfileCard';
import './Profile.css'
import Posts from '../Posts/Posts';
import { useState } from 'react';
import Settings from '../Settings/Settings';

export default function Profile({ userId, onEditPost, onDeleteAccount }) {
  const [view, setView] = useState('posts');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleToggleSettings = () => {
    view === 'posts' ? setView('settings') : setView('posts')
  }
  

  console.log('Profile -> render');

  try {
    return (
      <section className="user-profile">
        <ProfileCard userId={userId} onSettingsClick={handleToggleSettings} selectedAvatar={selectedAvatar} isSettingsOn={view === 'setting'} />
        {view === 'posts' && <Posts type={userId} userId={userId} onEditPost={onEditPost} />}
        {view === 'settings' && <Settings selectedAvatar={selectedAvatar} onAvatarChange={setSelectedAvatar} onDeleteAccount={onDeleteAccount}/>}
      </section>
    );
  } catch (error) {
    console.log(`profile error: ${error.message}`);
  }
}
