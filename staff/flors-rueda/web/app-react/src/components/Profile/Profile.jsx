import ProfileCard from './ProfileCard';
import './Profile.css'
import Posts from '../Posts/Posts';
import { useState } from 'react';
import Settings from './Settings/Settings';

export default function Profile({ userId, onEditPost }) {
  const [view, setView] = useState('posts');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleGoToSettings = () => setView('settings');

  console.log('Profile -> render');

  try {
    return (
      <section className="user-profile">
        <ProfileCard userId={userId} onSettingsClick={handleGoToSettings} selectedAvatar={selectedAvatar} />
        {view === 'posts' && <Posts type={userId} userId={userId} onEditPost={onEditPost} />}
        {view === 'settings' && <Settings selectedAvatar={selectedAvatar} onAvatarChange={setSelectedAvatar} />}
      </section>
    );
  } catch (error) {
    console.log(`profile error: ${error.message}`);
  }
}
