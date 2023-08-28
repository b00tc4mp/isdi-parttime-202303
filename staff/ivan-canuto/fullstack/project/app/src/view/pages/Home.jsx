import { useEffect, useState, useRef } from "react";
import { useAppContext, useHandleErrors } from "../hooks";
import { Button, Container, Input } from "../library";
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
  const [user, setUser] = useState()
  const [openedProfile, setOpenedProfile] = useState(false)
  const [writingText, setWritingText] = useState(false)
  const [search, setSearch] = useState(false)
  const [textToSearch, setTextToSearch] = useState()

  useEffect(() => {
    console.log("Home -> render");

    renderConversations();

    if (!lastPostsUpdate) handleRefreshUser()
  }, [lastPostsUpdate]);

  useEffect(() => {
    context.hideHeader = false
  },[])

  const handleRefreshUser = () => {
    handleErrors(async () => {
      const user = await retrieveUser();

      setUser(user);
    });
  }

  const renderConversations = () => {
    handleErrors(async () => {
      const conversations = await retrieveConversations();

      const newConversationsOptions = conversations.map((conv) => {
        return {
          id: conv.id,
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
    setPage('Home')

    setLastPostsUpdate(Date.now());
    document.body.classList.remove("fixed-scroll");
  };

  const handleOpenEditPost = () => setModal("editPost")

  const handleOpenDeletePost = () => setModal("deletePost")

  const handleToggleVisibility = () => setModal("toggleVisibility")

  const handleOpenProfile = () => {
    navigate('/profile')

    if (menu) handleToggleMenu()

    setOpenedProfile(true)

    document.body.classList.remove('fixed-scroll')
  };

  const handleLogout = () => {
    logoutUser();

    navigate("/login");

    context.postId = null
    context.conversationId = null
    context.suggestionId = null
  };

  const handleToggleMenu = () => {
    if (modal !== 'profile' && !writingText)
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

  const handleUpdatedAvatar = () => handleRefreshUser()

  const handleOpenChatbotWindow = () => {
    setPage("Chatbot");

    if (context.conversationId) context.conversationId = null

    if (context.hideHeader) context.hideHeader = false

    navigate("/chatbot");
  };

  const handleTogglePostModal = () => {
    document.body.classList.toggle("fixed-scroll");

    setPostModal(!postModal);
  };

  const scrollToTop = () => {
    const homeContainer = document.querySelector('.home-container')

    homeContainer.scrollTop = 0
  }

  const handleToggleSearchBar = () => {
    document.body.classList.add('fixed-scroll')

    setSearch(!search)
  }

  const handleSearch = event => {
    event.preventDefault()

    const text = event.target.textToSearch.value

    setTextToSearch(text)

    setView('searchedPosts')

    handleToggleSearchBar()

    handleLastPostsUpdate()
  }

  console.debug("Home -> render");

  return (
    <Container className="home-container bg-[url(src/images/chatbot-3.1.jpg)] bg-fixed bg-center bg-cover min-h-screen absolute left-0 overflow-scroll">
      <div className="loader"></div>
      {page === "Home" && (<>
        {!search && <div className="fixed top-[105px] z-10 flex justify-between w-full px-4">
          <Button className='border-gray-300 bg-slate-100 p-1 rounded flex gap-2' onClick={handleToggleSearchBar}><span className="material-symbols-outlined">search</span>Search...</Button>
          <Button className="bg-slate-100 border border-gray-200" onClick={handleOpenChatbotWindow}>
            <p className='flex items-center gap-1 text-lg'>Chat<span className="material-symbols-outlined">smart_toy</span></p>
          </Button>
        </div>}
        {search && <Container className='w-full h-full fixed top-0 left-0 z-30' onClick={event => {
          if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SPAN')
            handleToggleSearchBar()
        }}>
          <form className='search-form fixed top-[105px] w-full flex justify-center rounded-lg' onSubmit={handleSearch}>
            <div className="border-2 border-slate-300 flex rounded-lg gap-1">
              <Input className='border-none w-60' placeholder='Search something...' name='textToSearch' autoFocus></Input>
              <Button><span className="material-symbols-outlined">search</span></Button>
            </div>
          </form>
        </Container>

        }
      </>
      )}

      <Header
        handleOpenProfile={handleOpenProfile}
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
        setPage={setPage}
        handleCloseModal={handleCloseModal}
        lastPostsUpdate={lastPostsUpdate}
        openedProfile={openedProfile}
        setOpenedProfile={setOpenedProfile}
        setView={setView}
      />

      <main>
        {(page === 'Home' && !openedProfile) && <Posts
          lastPostsUpdate={lastPostsUpdate}
          view={view}
          handleTogglePostModal={handleTogglePostModal}
          textToSearch={textToSearch}
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
            homeOptions={[
              {
                text: "Home page",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setPage('Home')
                  setView("posts");

                  navigate("/");
                },
              },
              {
                text: 'Chatbot page',
                onClick: () => { handleOpenChatbotWindow() },
              },
              {
                text: "Own post",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setPage('Home')
                  setView("userPosts");

                  navigate("/");
                },
              },
              {
                text: "Saved posts",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setPage('Home')
                  setView("savedPosts");

                  navigate("/");
                },
              },
              {
                text: "SeenLately",
                onClick: () => {
                  setLastPostsUpdate(Date.now());

                  setPage('Home')
                  setView("seenPosts");

                  navigate("/");
                },
              },
              {
                text: "My suggestions",
                onClick: () => {
                  setPage('Suggestions')

                  navigate("/suggestions");
                },
              },
            ]}
            chatbotOptions={[
              {
                text: "<- Return to home",
                onClick: () => {
                  setPage("Home");

                  navigate("/");
                },
              },
              {
                text: "+ New chat",
                onClick: () => {
                  context.conversationId = null;

                  setLastPostsUpdate(Date.now());
                },
              },
              {
                id: 'deleteAllChatsId',
                text: `Delete all chats`,
                onClick: () => {
                  context.conversationId = null;

                  setLastPostsUpdate(Date.now());
                },
              },
              ...conversationsOptions,
              { onClick: () => { }, text: '' }
            ]}
            openedMenu={openedMenu}
            page={page}
            lastPostsUpdate={lastPostsUpdate}
            handleToggleMenu={handleToggleMenu}
            handleLastPostsUpdate={handleLastPostsUpdate}
            openedProfile={openedProfile}
            setOpenedProfile={setOpenedProfile}
            scrollToTop={scrollToTop}
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
                  setWritingText={setWritingText}
                  writingText={writingText}
                  setView={setView}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="suggestions"
            element={
              isUserLoggedIn() && page === 'Suggestions' ? <SuggestionsPage
                user={user}
                setPage={setPage}
                handleLastPostsUpdate={handleLastPostsUpdate}
              /> : <Navigate to="/login" />
            }
          />
          <Route
            path="profile"
            element={
              isUserLoggedIn() ? <Profile
                onUpdatedAvatar={handleUpdatedAvatar}
                handleLogout={handleLogout}
                page={page}
                setPage={setPage}
                setOpenedProfile={setOpenedProfile}
              /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </Container>
  );
}
