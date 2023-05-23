import { svg } from '../../../assets/svg-paths';
import { useState, useRef } from 'react';
import './Navbar.css';
import inLogger from '../../logger';

const Navbar = ({ onLogoutClick, onProfileClick, onHomeClick, onFavsClick}) => {
    const headerRef = useRef(null);
    const btnRef = useRef(null);

    const toggleNavbar = (event) => {
        event.preventDefault();
        headerRef.current.classList.toggle('show');
        btnRef.current.classList.toggle('close');
    };

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
 

    return <header className="nav-header">
            <button className="nav-header__menu" ref={btnRef} onClick={toggleNavbar}>
                <span className="nav-header__menu-line"></span>
                <span className="nav-header__menu-line"></span>
                <span className="nav-header__menu-line"></span>
            </button>
            <nav className="nav-header__navbar" ref={headerRef}>
                <button className="nav-header__logout" onClick={handleLogoutClick}>
                    <svg className="nav-header__logout--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.logout}/></svg>
                </button>
                <button className="nav-header__to-user-profile" onClick={handleProfileClick}>
                    <svg className="nav-header__to-user-profile--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.userProfile} /></svg>
                </button>
                <button className="nav-header__to-home" onClick={handleHomeClick}>
                    <svg className="nav-header__to-home--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.home}/></svg>
                </button>
                <button className="nav-header__to-favs" onClick={handleFavsClick}>
                    <svg className="nav-header__to-favs--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.fillStar} /></svg>
                </button>
            </nav>
        </header>
}

export default inLogger(Navbar)



    /*

        */





        /*
            const [activeButton, setActiveButton] = useState(null);

    const handleButtonHover = (buttonName) => {
        setActiveButton(buttonName);
      };

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

    return <header>
    <nav className="navbar">
      <div className="navbar__option">
        <button
          className={`navbar__user ${activeButton === 'user' ? 'active' : ''}`}
          onMouseEnter={() => handleButtonHover('user')}
          onMouseLeave={() => handleButtonHover(null)}
          onClick={handleProfileClick}
        >
          <img
            className="navbar__user--image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="User Avatar"
          />
        </button>
        {activeButton === 'user' && <span className="navbar__user--title">profile</span>}
      </div>
      <div className="navbar__option">
        <button
          className={`navbar__home ${activeButton === 'home' ? 'active' : ''}`}
          onMouseEnter={() => handleButtonHover('home')}
          onMouseLeave={() => handleButtonHover(null)}
          onClick={handleHomeClick}
        >
          <svg
            className="navbar__home--icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 96 960 960"
          >
            <path d="M154.022 941.978V452.971L480 208.348l326.218 244.543v489.087H561.435V654.565h-162.87v287.413H154.022Z" />
          </svg>
        </button>
        {activeButton === 'home' && <span className="navbar__user--title">home</span>}
      </div>
    </nav>
  </header>
        
        
        
        */