import { ModalContainer } from "../library"
import { useNavigate } from "react-router-dom"

export default function SideBarMenu({ showOwnPosts, showSavedPosts, openedMenu, handleToggleMenu }) {
  const navigate = useNavigate()

  const onShowHomePage = () => navigate('/') //Hay que mirar a ver si el uso de useNavigate cuando te devuelve a la home, te renderiza todos los posts o solo los de la página en la que estabas (saved posts, user posts)
  // const onShowHomePage = () => showHomePage()

  const onShowOwnPosts = () => showOwnPosts()
  
  const onShowSavedPosts = () => showSavedPosts()

  return  <ModalContainer>
      <ul className={`w-44 h-full bg-white fixed top-24 z-30 ${openedMenu ? 'opened-menu' : 'closed-menu'}`}>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowHomePage}>Home page</li>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowOwnPosts}>Own osts</li>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300" onClick={onShowSavedPosts}>Saved posts</li>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300">Suggestions</li>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300">Seen lately</li>
        <li className="text-black text-sm text-center p-4 border-b-[1px] border-gray-400 cursor-pointer hover:bg-gray-300">Last conversations</li>
      </ul>
    <div className='w-full h-full absolute top-0 z-10 bg-slate-200 opacity-50'></div>
    <div className='w-full h-full absolute top-0 z-20 opacity-50' onClick={handleToggleMenu}></div>
  </ModalContainer>
}