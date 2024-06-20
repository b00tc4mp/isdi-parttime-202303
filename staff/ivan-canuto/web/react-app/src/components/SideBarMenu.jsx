import './components-styles/SideBarMenu.css'

export default function SideBarMenu({ onHomePage, showOwnPosts, showSavedPosts, openedMenu }) {
  const showHomePage = () => onHomePage()

  const onShowOwnPosts = () => showOwnPosts()
  
  const onShowSavedPosts = () => showSavedPosts()

  return <>
    <ul className={`sidebar-menu ${openedMenu ? 'closed' : ''}`}>
      <li onClick={showHomePage}>Home page</li>
      <li onClick={onShowOwnPosts}>Own osts</li>
      <li onClick={onShowSavedPosts}>Saved posts</li>
    </ul>
  </>
}