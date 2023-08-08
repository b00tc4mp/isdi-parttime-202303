import { useEffect, useState } from "react";
import { useAppContext, useHandleErrors } from "../hooks";
import { Button, Container } from "../library";
import {
  Profile,
  Posts,
  SideBarMenu,
  Header,
  VisibilityPost,
  PostModalWindow
} from "../components";
import {
  logoutUser,
  retrievePosts,
  retrieveUser,
  retrieveConversations,
} from "../../logic";
import { Routes, Route, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../logic";
import { Chatbot, Suggestions, SeenLately } from "../components";
import Hello from "../components/Hello";
import { context } from "../../ui";

export default function Home() {
  const handleErrors = useHandleErrors();
  const { navigate } = useAppContext();

  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null);
  const [page, setPage] = useState("Home");
  const [view, setView] = useState("posts");
  const [conversations, setConversations] = useState(null);
  const [conversationsOptions, setConversationsOptions] = useState();

  //   const handleReturnToHome = () => {
  //     setView("posts");
  //     setLastPostsUpdate(Date.now()());
  //   };

  useEffect(() => {
    console.log("Home -> render");
    renderConversations();
  }, [lastPostsUpdate]);

  const renderConversations = () => {
    console.log("Render conversations");
    handleErrors(async () => {
      const conversations = await retrieveConversations();

      setConversations(conversations);

      const newConversationsOptions = conversations.map((conv) => {
        return {
          text: conv.title,
          onClick: () => {
            context.conversationId = conv.id;

            setLastPostsUpdate(Date.now());
          },
        };
      });

      setConversationsOptions(newConversationsOptions);
    });
  };

  const showOwnPosts = () => {
    setView("userPosts");
    setLastPostsUpdate(Date.now());
  };

  const showSavedPosts = () => {
    setView("savedPosts");
    setLastPostsUpdate(Date.now());
  };
  
  const handleLastPostsUpdate = () => {
    document.body.classList.remove("fixed-scroll");
    setLastPostsUpdate(Date.now());
    setModal(null);
  };

  const handleCloseModal = () => {
    document.body.classList.remove("fixed-scroll");
    setModal(null);
  };

  const handleOpenEditPost = () => {
	document.body.classList.toggle("fixed-scroll");
	setModal("editPost");
	setLastPostsUpdate(Date.now());
  };

  const handleOpenDeletePost = () => {
    document.body.classList.toggle("fixed-scroll");
    setModal("deletePost");
    setLastPostsUpdate(Date.now());
  };

  const handleToggleVisibility = () => {
    document.body.classList.toggle("fixed-scroll");
    setModal("toggleVisibility");
    setLastPostsUpdate(Date.now());
  };

  const handleOpenProfile = () => {
    document.body.classList.add("fixed-scroll");
    setModal("profile");
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };

  const handleToggleMenu = () => {
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
    setPage("Chatbot");

    context.conversationId = null;

    navigate("/chatbot");
  };

  const openPostModal = () => {
    document.body.classList.toggle('fixed-scroll')
    setModal('post')
  }

  console.debug("Home -> render");

  return (
    <Container className="bg-home h-full min-h-screen pt-20">
      <div className="loader"></div>
      <Button
        className="fixed top-[105px] right-2 bg-slate-200 z-10"
        onClick={() => handleOpenChatbotWindow()}
      >
        Chat wit me
      </Button>

      <Header
        handleOpenProfile={handleOpenProfile}
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
      />

      <main>
        <Posts
          lastPostsUpdate={lastPostsUpdate}
          view={view}
          handleOpenEditPost={handleOpenEditPost}
          handleOpenDeletePost={handleOpenDeletePost}
          handleToggleVisibility={handleToggleVisibility}
          openPostModal={openPostModal}
        />

        {modal === "editPost" && (
          <EditPost
            onUpdatedPost={handleLastPostsUpdate}
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

        {modal === "profile" && (
          <Profile
            onUpdatedAvatar={handleUpdatedAvatar}
            onCancel={handleCloseModal}
          />
        )}

        {modal === 'post' && (
          <PostModalWindow
            handleCloseModal={handleCloseModal}
          />
        )}

        {menu && (
          <SideBarMenu
            chatbotOptions={[
              {
                text: "<- Return to home",
                onClick: () => navigate("/"),
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
            openedMenu={openedMenu}
            page={page}
            lastPostsUpdate={lastPostsUpdate}
            setPage={setPage}
            handleToggleMenu={handleToggleMenu}
          />
        )}

        <Routes>
          <Route path="hello" element={<Hello />}></Route>
          <Route
            path="chatbot"
            element={
              isUserLoggedIn() ? (
                <Chatbot
                  lastPostsUpdate={lastPostsUpdate}
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
              isUserLoggedIn() ? <Suggestions /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/seen-lately"
            element={
              isUserLoggedIn() ? <SeenLately /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </Container>
  );
}
