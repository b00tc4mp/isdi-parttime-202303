import { useState, useEffect } from "react"

import { retrievePosts, retrieveUser } from "../../logic"

import Post from "./Post.jsx"

export default function Posts({ onEditPost, lastPostsUpdate, user }) {
    console.debug('/// Saved Posts  -> Render');

    const [posts, setPosts] = useState()
    const [_user, setUser] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            retrievePosts(context.userId, (error, posts) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setPosts(posts)
            })

            retrieveUser(context.userId, (error, user) => {
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
        console.debug('Posts -> component will liseten for props changes using Hooks');

        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate]

    )


    return <section className="post-list border-top-gradient">
        <h2 className="post-list-headline">All Posts</h2>

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




