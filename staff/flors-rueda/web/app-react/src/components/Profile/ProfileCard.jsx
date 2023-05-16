import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { retrieveUser } from '../../logic/retrieve-user';
import { colors } from '../../../assets/avatar';
import Avatar from 'boring-avatars';
import './ProfileCard.css';

export default function ProfileCard({ userId, onSettingsClick, selectedAvatar }) {
  const userData = retrieveUser(userId);
  const handleSettingsClick = () => {
    onSettingsClick();
  };
  console.log('ProfileCard -> render');

  try {
    return (
      <article className="user-card">
        <div className="user-card__border">
          {userId === context.userAuth && (
            <svg
              onClick={handleSettingsClick}
              className="user-card__settings"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 960 960"
            >
              <path d={svg.settings} />
            </svg>
          )}
          <div className="user-card__avatar">
            {selectedAvatar ? (
              selectedAvatar.length > 6 ?
              <img
                className="user-card__avatar-image"
                src={selectedAvatar}
                alt="User Avatar"
              />:
              <Avatar
              size={128}
              variant="beam"
              colors={colors}
              name={selectedAvatar}
            /> 
            ) : (
              userData.avatar.random ?
              <Avatar
                size={128}
                variant="beam"
                colors={colors}
                name={userData.avatar.src}
              /> :
              <img
                className="user-card__avatar-image"
                src={userData.avatar.src}
                alt="User Avatar"
              />
            )}
          </div>
        </div>
        <p className="user-card__name">{userData.name}</p>
        <p className="user-card__username">{userData.username}</p>
      </article>
    );
  } catch (error) {
    console.log(`ProfileCard error: ${error.message}`);
  }
}