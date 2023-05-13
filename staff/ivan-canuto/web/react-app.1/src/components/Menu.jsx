export default function Menu(props) {

  function onHomePageClick() {
    props.onHomePage()
  }

  function showOwnPosts() {
    props.showOwnPosts()
  }
  
  function showSavedPosts() {
    props.showSavedPosts()
  }

  return <ul className="menu">
    <li onClick={onHomePageClick}>Home page</li>
    <li onClick={showOwnPosts}>Own osts</li>
    <li onClick={showSavedPosts}>Saved posts</li>
  </ul>
}