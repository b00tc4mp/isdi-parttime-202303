import './Navbar.css';
import { svg } from '../../../public/svg-paths'
import inLogger from '../../inLogger';

const Navbar = ({ onLogoutClick, onProfileClick, onHomeClick, onFavsClick }) => {
  const handleLogoutClick = (event) => {
    event.preventDefault();
    onLogoutClick();
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    onProfileClick();
  };

  const handleFavsClick = () => onFavsClick();

  const handleHomeClick = () => onHomeClick();


  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--color-terciary-transparence)] shadow dark:bg-gray-800">
      <div className="container flex items-center justify-between p-6">
        <div className="flex items-center gap-2 justify-start">
          <button className="nav-header__to-user-profile" onClick={handleProfileClick}>
            <svg className="nav-header__to-user-profile--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.userProfile} /></svg>
          </button>
          <button className="nav-header__to-favs" onClick={handleFavsClick}>
            <svg className="nav-header__to-favs--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.fillStar} /></svg>
          </button>
          <button className="nav-header__to-home" onClick={handleHomeClick}>
            <svg className="nav-header__to-home--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.home} /></svg>
          </button>
        </div>
        <button className="nav-header__logout" onClick={handleLogoutClick}>
          <svg className="nav-header__logout--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.logout} /></svg>
        </button>
      </div>
    </nav>
  )

};

export default inLogger(Navbar);



