import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { context } from '../ui'
import { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'

export default function Posts({ onEditPost, lastPostsUpdate, user }) {
    console.debug('Posts -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            freeze()

            retrievePosts(context.token, (error, posts) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setPosts(posts)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.debug('Posts -> "componentWillReceiveProps" with hooks')

        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate])

    return <section>
        {posts && posts.map(post => <Post
            key={post.id}
            post={post}
            onEditPost={onEditPost}
            onToggledLikePost={handleRefreshPosts}
            onPostDeleted={handleRefreshPosts}
            onToggledSavePost={handleRefreshPosts}
            user={user}
        />)}
    </section>
}