import { svg } from '../../assets/svg-paths'
import { useRef } from 'react'

export default function Navbar({ onLogoutClick, onProfileClick, onHomeClick}) {
    const headerRef = useRef(null)
    const btnRef = useRef(null)

    function toggleNavbar(event) {
        event.preventDefault();
        headerRef.current.classList.toggle('show');
        btnRef.current.classList.toggle('close');
    };

    function handleLogoutClick(event) {
        event.preventDefault();
        onLogoutClick();
    };

    function handleProfileClick(event) {
        if (onProfileClick) {
          onProfileClick(event);
        }
      };

    function handleHomeClick(event) {
        event.preventDefault();
        onHomeClick();
    };


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
            </nav>
        </header>
}