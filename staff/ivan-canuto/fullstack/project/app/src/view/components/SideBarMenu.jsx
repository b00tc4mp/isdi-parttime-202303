import { ModalContainer } from "../library"

export default function SideBarMenu({ showHomePage, showOwnPosts, showSavedPosts, openedMenu, handleToggleMenu }) {
  const onShowHomePage = () => showHomePage()

  const onShowOwnPosts = () => showOwnPosts()
  
  const onShowSavedPosts = () => showSavedPosts()

  return  <>
      <ul className={`w-44 h-full bg-white fixed top-24 z-30 ${openedMenu ? 'opened-menu' : 'closed-menu'}`}>
        <li className="text-black text-sm text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowHomePage}>Home page</li>
        <li className="text-black text-sm text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowOwnPosts}>Own osts</li>
        <li className="text-black text-sm text-center p-4 border-b-2 border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowSavedPosts}>Saved posts</li>
      </ul>
    <div className='w-full h-full absolute top-0 z-10 bg-slate-200 opacity-50'></div>
    <div className='w-full h-full absolute top-0 z-20 opacity-50' onClick={handleToggleMenu}></div>
  </>
}