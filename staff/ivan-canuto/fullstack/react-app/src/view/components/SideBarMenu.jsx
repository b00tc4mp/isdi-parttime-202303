export default function SideBarMenu({ showHomePage, showOwnPosts, showSavedPosts, openedMenu }) {
  const onShowHomePage = () => showHomePage()

  const onShowOwnPosts = () => showOwnPosts()
  
  const onShowSavedPosts = () => showSavedPosts()

  return <>
    <ul className={`w-44 h-full bg-gray-200 fixed top-0 mt-32 ${openedMenu ? 'opened-menu' : 'closed-menu'}`}>
      <li className="text-black text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowHomePage}>Home page</li>
      <li className="text-black text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowOwnPosts}>Own osts</li>
      <li className="text-black text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowSavedPosts}>Saved posts</li>
    </ul>
  </>
}