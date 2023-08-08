import { ModalContainer } from "../library";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SideBarMenu({
  chatbotOptions,
  page,
  openedMenu,
  lastPostsUpdate,
  setPage,
  handleToggleMenu,
}) {
  const navigate = useNavigate();

  const [, setForceUpdate] = useState();

  useEffect(() => {
    setForceUpdate();
    setPage("Chatbot");
  }, [lastPostsUpdate]);

  // const onShowHomePage = () => navigate('/') //Hay que mirar a ver si el uso de useNavigate cuando te devuelve a la home, te renderiza todos los posts o solo los de la página en la que estabas (saved posts, user posts)
  // const onShowHomePage = () => showHomePage()

  // const onShowOwnPosts = () => showOwnPosts()

  // const onShowSavedPosts = () => showSavedPosts()

  return (
    <ModalContainer>
      <ul
        className={`w-44 h-full bg-white fixed top-24 z-30 border-t border-black ${
          openedMenu ? "opened-menu" : "closed-menu"
        }`}
      >
        {page === "Chatbot" &&
          chatbotOptions &&
          chatbotOptions.map((option, index) => {
            return (
              <div
                key={index}
                className="h-14 bg-gray-100 w-full border border-t-0 border-black flex justify-center overflow-auto items-center"
                onClick={() => {
                  option.onClick();

                  handleToggleMenu();
                }}
              >
                <p>{option.text}</p>
              </div>
            );
          })}
          {page === 'Posts'}
      </ul>
    </ModalContainer>
  );
}
