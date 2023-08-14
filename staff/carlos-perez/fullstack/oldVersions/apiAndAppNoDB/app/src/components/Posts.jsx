import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { useState, useEffect, useContext } from 'react'
import { context } from '../main.js'
import Context from '../Context'

export default function Posts({ onEditPost, lastPostsUpdate, user }) {
    const { alert, freeze, unfreeze } = useContext(Context)
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            //freeze()

            retrievePosts(context.userId, (error, posts) => {
                //unfreeze()

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
        console.debug('Posts -> "componentDidMount" with hooks')

        return () => console.debug('Posts -> "componentWillUnmount" with hooks')
    }, [])

    useEffect(() => {
        console.debug('Posts -> "componentWillReceiveProps" with hooks')

        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate])

    console.debug('Posts -> render')

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