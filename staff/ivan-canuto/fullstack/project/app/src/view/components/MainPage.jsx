

export default function MainPage() {
    const [view, setView] = useState("posts")


    const showOwnPosts = () => {
        setView("userPosts")
        setLastPostsUpdate(Date.now())
    }

    const showSavedPosts = () => {
        setView("savedPosts")
        setLastPostsUpdate(Date.now())
    }

    const handleOpenEditPost = () => {
        document.body.classList.toggle("fixed-scroll")
        setModal("editPost")
        setLastPostsUpdate(Date.now())
    }

    const handleLastPostsUpdate = () => {
        document.body.classList.remove("fixed-scroll")
        setLastPostsUpdate(Date.now())
        setModal(null)
    }

    const handleCloseModal = () => {
        document.body.classList.remove("fixed-scroll")
        setModal(null)
    }

    const handleOpenDeletePost = () => {
        document.body.classList.toggle("fixed-scroll")
        setModal("deletePost")
        setLastPostsUpdate(Date.now())
    }

    const handleToggleVisibility = () => {
        document.body.classList.toggle("fixed-scroll")
        setModal("toggleVisibility")
        setLastPostsUpdate(Date.now())
    }

    return <section>
        <Posts
          lastPostsUpdate={lastPostsUpdate}
          view={view}
          handleOpenEditPost={handleOpenEditPost}
          handleOpenDeletePost={handleOpenDeletePost}
          handleToggleVisibility={handleToggleVisibility}
        />

        {modal === "editPost" && (
          <EditPost
            onUpdatedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {modal === 'toggleVisibility' && (
          <VisibilityPost
            onChangedVisibility={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}
        
        {modal === 'deletePost' && (
          <DeletePost
            onDeletedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}
    </section>
}