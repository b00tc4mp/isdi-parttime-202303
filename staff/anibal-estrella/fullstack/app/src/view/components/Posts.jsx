import { useState, useEffect } from "react"
import { useAppContext } from "../hooks"

import { retrievePosts, retrieveFavPosts, retrieveUser } from "../../logic"

import Post from "./Post.jsx"

export default ({ onEditPost, lastPostsUpdate, onOpenSavedPosts, user }) => {
    console.debug('/// Posts  -> Render');

    const { alert, freeze, unfreeze } = useAppContext()

    const [posts, setPosts] = useState()

    // const [_user, setUser] = useState()

    // useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = (view) => {
        try {
            freeze()
            if (view === 'saved-posts') {
                retrieveFavPosts()
                    .then(setPosts)
                    .catch(error => alert(error.message))
                    .finally(unfreeze)
            } else {
                retrievePosts()
                    .then(setPosts)
                    .catch(error => alert(error.message))
                    .finally(unfreeze)
            }
        } catch (error) {
            alert(error.message)
            unfreeze()
        }
    }

    useEffect(() => {
        console.debug('Posts -> component will listen for props changes using Hooks');

        if (lastPostsUpdate)
            handleRefreshPosts()

        if (onOpenSavedPosts) {
            handleRefreshPosts(onOpenSavedPosts)
        }

    }, [lastPostsUpdate, onOpenSavedPosts]

    )


    return <section className="post-list">
        {/* <h2 className="post-list-headline">All Posts</h2> */}

        {posts && posts.map(post => <Post
            key={post.id}
            post={post}
            user={user}
            onEditPost={onEditPost}
            onDeletedPost={handleRefreshPosts}
            onToggledLikePost={handleRefreshPosts}
            onToggledFavPost={handleRefreshPosts}
            onPostEdited={handleRefreshPosts}
        />)}

    </section>

}




