import './components-styles/Menu.css'


export default function Menu(props) {

  const showHomePage = () => {
    props.onHomePage()
  }

  const showOwnPosts = () => {
    props.showOwnPosts()
  }
  
  const showSavedPosts = () => {
    props.showSavedPosts()
  }

  return <ul className="menu">
    <li onClick={showHomePage}>Home page</li>
    <li onClick={showOwnPosts}>Own osts</li>
    <li onClick={showSavedPosts}>Saved posts</li>
  </ul>
}