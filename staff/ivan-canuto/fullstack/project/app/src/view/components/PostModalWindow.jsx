import { useEffect, useState } from "react";
import { ModalContainer } from "../library";
import { useHandleErrors } from "../hooks";
import {
  retrievePost,
  retrieveUser,
  toggleLikePost,
  toggleSavePost,
} from "../../logic";
import { context } from "../../ui";
import { ContextualMenu, Comments, Suggestions } from "../components";

export default function PostModalWindow({
  handleOpenEditPost,
  handleOpenDeletePost,
  handleToggleVisibility,
  handleLastPostsUpdate,
  handleTogglePostModal,
  lastPostsUpdate
}) {
  const handleErrors = useHandleErrors();

  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [contextualMenu, setContextualMenu] = useState("close");
  const [modal, setModal] = useState("post");

  useEffect(() => {
    console.log("PostModalWindow -> render");

    handleRefreshPost();
    handleRefreshUser();
  }, [lastPostsUpdate]);

  const handleRefreshUser = () => {
    handleErrors(async () => {
      const user = await retrieveUser();

      setUser(user);
    });
  };

  const handleRefreshPost = () => {
    handleErrors(async () => {
      const post = await retrievePost(context.postId);
      
      setPost(post);
    });
  };

  const handleToggleLike = () => {
    handleErrors(async () => {
      await toggleLikePost(post.id);

      handleRefreshPost();
    });
  };

  const handleToggleFav = () => {
    handleErrors(async () => {
      await toggleSavePost(post.id);

      handleRefreshPost();
      handleRefreshUser();
    });
  };

  const toggleContextualMenu = () => {
    context.postId = post.id;

    setContextualMenu(contextualMenu === "close" ? "open" : "close");
  };

  const handleReturn = () => {
    if (modal !== "post") setModal("post");
    else {
      handleTogglePostModal();
      handleLastPostsUpdate();
    }
  };

  const handleOpenSuggestions = () => setModal("suggestions");

  return (
    <ModalContainer
      className="bg-black h-screen bg-opacity-20 fixed z-20 top-0 left-0"
      onClick={(event) => {
        if (event.target === document.querySelector(".ModalContainer")) {
          handleTogglePostModal();
          handleLastPostsUpdate();
        }
      }}
    >
      {contextualMenu === "open" && (
        <ContextualMenu
          options={[
            {
              text: "Suggestions",
              onClick: () => {
                handleOpenSuggestions();
                toggleContextualMenu();
              },
            },
            {
              text: "Edit post",
              onClick: () => {
                handleOpenEditPost();
                toggleContextualMenu();
              },
            },
            {
              text: `Set post ${post && post.visible ? "private" : "public"}`,
              onClick: () => {
                handleToggleVisibility();
                toggleContextualMenu();
              },
            },
            {
              text: "Delete post",
              onClick: () => {
                handleOpenDeletePost();
                toggleContextualMenu();
              },
            },
          ]}
          toggleContextualMenu={toggleContextualMenu}
        />
      )}

      <section className="w-11/12 h-5/6 bg-white rounded-lg flex flex-col items-center gap-2">
        {post && (
          <div className="w-full flex justify-between p-2">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined w-8"
                onClick={handleReturn}
              >
                arrow_back
              </span>
              <img
                className="h-8 w-8 object-cover rounded-full"
                src={post.author.avatar}
                alt="post-user-avatar"
              />
              <p className="px-1">{post.author.name}</p>
            </div>

            {modal === "post" && (
              <div className="flex items-center">
                {user && post.author.id === user.id && (
                  <>
                    <p className="mx-1">
                      {post.visible ? "Public" : "Private"}
                    </p>
                    <span
                      className="material-symbols-outlined hover:bg-gray-300 cursor-pointer font-black rounded-full"
                      onClick={toggleContextualMenu}
                    >
                      more_vert
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {post && modal === "post" && (
          <>
            <h1 className="px-2 text-xl text-center">{post.title}</h1>

            <p className="px-2 h-2/3 overflow-scroll">{post.text}</p>

            <div className="px-2 w-full flex justify-between">
              <div>
                <div className="flex gap-2">
                  <i onClick={handleToggleFav}>
                    {user && post.fav ? (
                      <span className="material-symbols-outlined cursor-pointer filled saved">
                        bookmark
                      </span>
                    ) : (
                      <span className="material-symbols-outlined cursor-pointer">
                        bookmark
                      </span>
                    )}
                  </i>

                  <i>
                    <span
                      className="material-symbols-outlined cursor-pointer"
                      onClick={() => {
                        context.postId = post.id;

                        setModal("comments");
                      }}
                    >
                      mode_comment
                    </span>
                  </i>

                  <i onClick={handleToggleLike}>
                    {user && post.liked ? (
                      <span className="material-symbols-outlined cursor-pointer filled liked">
                        favorite
                      </span>
                    ) : (
                      <span className="material-symbols-outlined cursor-pointer">
                        favorite
                      </span>
                    )}
                  </i>
                </div>

                <p className="mt-[-5px] ml-1">
                  {post.likes ? post.likes.length + " likes" : "0 likes"}
                </p>
              </div>
              <p className="ml-2">{post.date}</p>
            </div>
          </>
        )}

        {post && modal === "comments" && (
          <Comments
            handleRefreshPost={handleRefreshPost}
            post={post}
            user={user}
          />
        )}

        {post && modal === "suggestions" && <Suggestions
          handleRefreshPost={handleRefreshPost}
          post={post}
          user={user}
        />}
      </section>
    </ModalContainer>
  )
}