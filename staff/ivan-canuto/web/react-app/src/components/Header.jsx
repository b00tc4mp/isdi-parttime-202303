
export default function Header({ handleToggleMenu, handleReturnToPosts, handleOpenProfile, handleReturnToLogin, user, handleSwitchMode }) {

  return <>
  <header className="header">
    <div>
      <span className="material-symbols-outlined menu-icon" onClick={handleToggleMenu}>menu</span>
      <h1 className="title" onClick={handleReturnToPosts}>Home</h1>
      <div className="name-avatar-profile" onClick={handleOpenProfile}>  
          <img className="avatar-image" src={user.avatar} alt="avatar image" />
          <a>{user.name}</a>
      </div>
      <button className="switch-mode-button" onClick={handleSwitchMode}>Switch mode</button>
      <button className="logout-button" onClick={handleReturnToLogin}>Logout</button>
    </div>
  </header>
  </>
}