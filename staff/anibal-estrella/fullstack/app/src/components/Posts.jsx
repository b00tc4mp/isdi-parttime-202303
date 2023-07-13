import { useState, useEffect } from "react"
import { context } from "../ui"
import { useAppContext } from "../hooks"

import { retrievePosts, retrieveSavedPosts, retrieveUser } from "../logic"

import Post from "./Post.jsx"

export default function Posts({ onEditPost, lastPostsUpdate, onOpenSavedPosts, user }) {
    console.debug('/// Posts  -> Render');

    const { alert, freeze, unfreeze } = useAppContext()

    const [posts, setPosts] = useState()

    const [_user, setUser] = useState()

    // useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = (view) => {

        try {
            freeze()
            if (view === 'saved-posts') {
                retrieveSavedPosts(context.token, (error, posts) => {
                    unfreeze()

                    if (error) {
                        alert(error.message)
                        return
                    }
                    setPosts(posts)
                })

            } else
                retrievePosts(context.token, (error, posts) => {
                    unfreeze()

                    if (error) {
                        alert(error.message)

                        return
                    }
                    setPosts(posts)
                })



            retrieveUser(context.token, (error, _user) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }
                setUser(_user)
            })
        } catch (error) {
            alert(error.message)
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




