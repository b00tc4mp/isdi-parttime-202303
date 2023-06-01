import { svg } from '../../../public/svg-paths';
import { context } from '../../ui';
import './ProfileCard.css';
import { useState, useContext } from 'react';
import inLogger from '../../inLogger';
import Context from '../../Context';


const ProfileCard = ({ userId, onSettingsClick, selectedAvatar, user }) => {
  const [isSettingsOn, setIsSettingsOn] = useState(false);
  const { alert } = useContext(Context);

  const handleSettingsClick = () => {
    onSettingsClick();
    setIsSettingsOn(!isSettingsOn)
  };

  try {
    return (
      <section className="user">
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
        <article className="user-card">
          <div className="user-card__border">
            <div className="user-card__avatar">
              {selectedAvatar ? <img className="user-card__avatar-image" src={selectedAvatar} alt="User Avatar" />
               : <img className="user-card__avatar-image" src={user.avatar} alt="User Avatar" />
              }
            </div>
          </div>
          <div className="user-card__footer">
            <div className="user-card__data">
              <div className="user-card__name">
                <p className="user-card__name">{user.name}</p>
                <p className="user-card__username">{user.username}</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    );
  } catch (error) {
    alert(`ProfileCard error: ${error.message}`, 'danger');
  }
}

export default inLogger(ProfileCard)