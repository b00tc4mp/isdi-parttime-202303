import { ModalContainer } from "../library";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SideBarMenu({
  chatbotOptions,
  homeOptions,
  page,
  openedMenu,
  lastPostsUpdate,
  handleToggleMenu,
  setPage
}) {
  const navigate = useNavigate();

  const [, setForceUpdate] = useState();

  useEffect(() => {
    setForceUpdate();
  }, [lastPostsUpdate]);

  // const onShowHomePage = () => navigate('/') //Hay que mirar a ver si el uso de useNavigate cuando te devuelve a la home, te renderiza todos los posts o solo los de la página en la que estabas (saved posts, user posts)
  // const onShowHomePage = () => showHomePage()

  // const onShowOwnPosts = () => showOwnPosts()

  // const onShowSavedPosts = () => showSavedPosts()

  console.log(page);

  return (
    <ModalContainer
      className="absolute top-0 left-0 z-0"
      onClick={(event) => {
        if (event.target === document.querySelector(".ModalContainer"))
          handleToggleMenu();
      }}
    >
      <ul
        className={`w-44 h-full bg-white fixed top-24 z-20 border-t-2 border-white ${
          openedMenu ? "opened-menu" : "closed-menu"
        }`}
      >
        {page === "Chatbot" &&
          chatbotOptions &&
          chatbotOptions.map((option, index) => {
            return (
              <div
                key={index}
                className="h-14 bg-gray-100 w-full border-2 border-t-0 border-white flex justify-center overflow-auto items-center"
                onClick={() => {
                  option.onClick();

                  handleToggleMenu();
                }}
              >
                <p>{option.text}</p>
              </div>
            );
          })}
        {page === "Home" &&
          homeOptions &&
          homeOptions.map((option, index) => {
            return <div
              key={index}
              className="h-14 bg-gray-100 w-full border-2 border-t-0 border-white flex justify-center overflow-auto items-center"
              onClick={() => {
                option.onClick();

                handleToggleMenu();
              }}
            >
              <p>{option.text}</p>
            </div>;
          })}
      </ul>
    </ModalContainer>
  );
}
