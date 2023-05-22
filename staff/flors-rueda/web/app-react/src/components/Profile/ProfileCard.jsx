import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { retrieveUser } from '../../logic/retrieve-user';
import { colors } from '../../../assets/avatar';
import Avatar from 'boring-avatars';
import './ProfileCard.css';
import { useState, useEffect } from 'react';

export default function ProfileCard({ userId, onSettingsClick, selectedAvatar}) {
  const [isSettingsOn, setIsSettingsOn] = useState(false);
  const [user, setUser] = useState()

  useEffect(() => {
      try {
          retrieveUser(userId, (error, user) => {
              if (error) {
                  console.log(error.message);
                  return;
              }
              setUser(user);
          })
      } catch (error) {
        console.log(error.message)
      }
  }, [])

  const handleSettingsClick = () => {
    onSettingsClick();
    setIsSettingsOn(!isSettingsOn)
  };
  console.log('ProfileCard -> render');

  try {
    return (
      <article className="user-card">
        <div className="user-card__border">
          <div className="user-card__avatar">
            {selectedAvatar ? (
              selectedAvatar.length > 10 ?
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
              user.avatar.random ?
              <Avatar
                size={128}
                variant="beam"
                colors={colors}
                name={user.avatar.src}
              /> :
              <img
                className="user-card__avatar-image"
                src={user.avatar.src}
                alt="User Avatar"
              />
            )}
          </div>
        </div>
        <div className="user-card__footer">
        <div className="user-card__data">
          <div className="user-card__name">
            <p className="user-card__name">{user.name}</p>
            <p className="user-card__username">{user.username}</p>
          </div>
        </div>
        {userId === context.userAuth && (
            <div className="user-view__change"><svg
            onClick={handleSettingsClick}
            className="user-view__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
          >
            <path d={isSettingsOn ? svg.album : svg.settings} />
          </svg>
            <b className="user-view__name">{isSettingsOn ? 'my posts' : 'settings'}</b>
          </div>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.log(`ProfileCard error: ${error.message}`);
  }
}