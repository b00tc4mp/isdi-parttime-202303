import { useEffect, useState } from "react";
import { useAppContext, useHandleErrors } from "../hooks";
import { Button, Container } from "../library";
import { Profile, Posts, SideBarMenu, Header, VisibilityPost, EditPost, DeletePost, PostModalWindow, Chatbot, SuggestionsPage, SeenLately } from "../components";
import { logoutUser, retrieveUser, retrieveConversations } from "../../logic";
import { Routes, Route, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../logic";
import { context } from "../../ui";

export default function Home() {
  const handleErrors = useHandleErrors();
  const { navigate } = useAppContext();

  const [modal, setModal] = useState();
  const [menu, setMenu] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null);
  const [page, setPage] = useState("Home");
  const [view, setView] = useState("posts");
  const [conversationsOptions, setConversationsOptions] = useState();
  const [postModal, setPostModal] = useState(false)

  useEffect(() => {
    console.log("Home -> render");

    renderConversations();
  }, [lastPostsUpdate]);

  const renderConversations = () => {
    console.log("Render conversations");
    handleErrors(async () => {
      const conversations = await retrieveConversations();

      const newConversationsOptions = conversations.map((conv) => {
        return {
          text: conv.title,
          onClick: () => {
            setPage("Chatbot");

            context.conversationId = conv.id;

            setLastPostsUpdate(Date.now());
          },
        };
      });

      setConversationsOptions(newConversationsOptions);
    });
  };

  const handleLastPostsUpdate = () => {
    document.body.classList.remove("fixed-scroll");
    setLastPostsUpdate(Date.now());
    
    setModal(null);
  };

  const handleCloseModal = () => {
    setModal(null);

    setLastPostsUpdate(Date.now());
    document.body.classList.remove("fixed-scroll");
  };

  const handleOpenEditPost = () => setModal("editPost")

  const handleOpenDeletePost = () => setModal("deletePost")

  const handleToggleVisibility = () => setModal("toggleVisibility")

  const handleOpenProfile = () => {
    navigate('/profile')
    setModal('profile')

    if(menu) handleToggleMenu()
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/login");

    delete context.postId
    delete context.conversationId
    delete context.suggestionId
  };

  const handleToggleMenu = () => {
    if(modal !== 'profile')
      if (!menu) {
        setMenu(!menu);
        setOpenedMenu(!openedMenu);
      } else {
        setTimeout(() => {
          setMenu(!menu);
        }, 400);
        setOpenedMenu(!openedMenu);
      }
  };

  const handleUpdatedAvatar = () => {
    handleErrors(async () => {
      const user = await retrieveUser();

      setUser(user);
    });
  };

  const handleOpenChatbotWindow = async () => {
    context.conversationId = null;

    navigate("/chatbot");
  };

  const handleTogglePostModal = () => {
    document.body.classList.toggle("fixed-scroll");

    setPostModal(!postModal);
  };

  console.debug("Home -> render");

  return (
    <Container className="bg-[url(src/images/chatbot-3.1.jpg)] bg-fixed bg-center bg-cover h-full min-h-screen pt-20">
      <div className="loader"></div>
      {page === "Home" && (
        <Button
          className="fixed top-[105px] right-2 bg-slate-200 z-10"
          onClick={() => {
            handleOpenChatbotWindow();

          }}
        >
          Chat wit me
        </Button>
      )}

      <Header
        handleOpenProfile={handleOpenProfile}
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
        setPage={setPage}
        handleCloseModal={handleCloseModal}
        />

      <main>
        {page === 'Home' && <Posts
          lastPostsUpdate={lastPostsUpdate}
          view={view}
          handleTogglePostModal={handleTogglePostModal}
        />}

        {modal === "editPost" && (
          <EditPost
            onUpdatedPost={handleCloseModal}
            onCancel={handleCloseModal}
          />
        )}

        {modal === "toggleVisibility" && (
          <VisibilityPost
            onChangedVisibility={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {modal === "deletePost" && (
          <DeletePost
            onDeletedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {/* {modal === "profile" && (
          <Profile
            onUpdatedAvatar={handleUpdatedAvatar}
            onCancel={handleCloseModal}
            handleLogout={handleLogout}
          />
        )} */}

        {postModal && (
          <PostModalWindow
            handleOpenDeletePost={handleOpenDeletePost}
            handleOpenEditPost={handleOpenEditPost}
            handleToggleVisibility={handleToggleVisibility}
            handleLastPostsUpdate={handleLastPostsUpdate}
            handleTogglePostModal={handleTogglePostModal}
            lastPostsUpdate={lastPostsUpdate}
          />
        )}

        {menu && (
          <SideBarMenu
            chatbotOptions={[
              {
                text: "<- Return to home",
                onClick: () => {
                  setPage("Home");

                  navigate("/");
                },
              },
              {
                text: "+ New conversation",
                onClick: () => {
                  context.conversationId = null;

                  setLastPostsUpdate(Date.now());
                },
              },
              ...conversationsOptions,
            ]}
            homeOptions={[
              {
                text: "Home page",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setView("posts");

                  navigate("/");
                },
              },
              {
                text: "Own post",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setView("userPosts");

                  navigate("/");
                },
              },
              {
                text: "Saved posts",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setView("savedPosts");

                  navigate("/");
                },
              },
              {
                text: "My suggestions",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  navigate("/suggestions");
                },
              },
              {
                text: "Chatbot page",
                onClick: () => {
                  setPage("Chatbot");

                  navigate("/chatbot");
                },
              },
              {
                text: "SeenLately",
                onClick: () => {
                  setPage("SeenLately");

                  navigate("/seenLately");
                },
              },
            ]}
            openedMenu={openedMenu}
            page={page}
            lastPostsUpdate={lastPostsUpdate}
            handleToggleMenu={handleToggleMenu}
            setPage={setPage}
          />
        )}

        <Routes>
          {/* <Route path="hello" element={<Hello />}></Route> */}
          <Route
            path="chatbot"
            element={
              isUserLoggedIn() ? (
                <Chatbot
                  lastPostsUpdate={lastPostsUpdate}
                  setPage={setPage}
                  handleLastPostsUpdate={handleLastPostsUpdate}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="suggestions"
            element={
              isUserLoggedIn() ? <SuggestionsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="seen-lately"
            element={
              isUserLoggedIn() ? <SeenLately /> : <Navigate to="/login" />
            }
          />
          <Route
            path="profile"
            element={
              isUserLoggedIn() ? <Profile
                onUpdatedAvatar={handleUpdatedAvatar}
                handleLogout={handleLogout}
                page={page}
                handleCloseModal={handleCloseModal}
              /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </Container>
  );
}
