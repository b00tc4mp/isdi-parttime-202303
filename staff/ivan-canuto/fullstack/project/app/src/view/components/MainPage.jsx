

export default function MainPage() {
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