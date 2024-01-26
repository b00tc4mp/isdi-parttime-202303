import { useState, useEffect } from 'react'
import retrievePosts from '../../logic/retrievePosts.js'
import Post from './Post.jsx'
import useAppContext from '../hooks/UseAppContext.js'


export default function Posts({ onEditPost, lastPostsUpdate }) {
    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPost(), [])

    const handleRefreshPost = () => {
        try {
            freeze()
            // retrievePosts(context.token, (error, posts) => {
            //     unfreeze()
            //     if (error) {
            //         alert(error.message)
            //         return
            //     }
            //     setPosts(posts)
            // })

            retrievePosts()
                .then(posts => setPosts(posts))
                .catch(error => alert(error.message))
                .finally(unfreeze)
        } catch (error) {
            alert(error.message)
            unfreeze()
        }
    }

    useEffect(() => {
        console.debug('Posts-> componenWillReceiveProps with Hooks')

        if (lastPostsUpdate)
            handleRefreshPost()
    }, [lastPostsUpdate])


    console.debug('posts -> render')

    return <section>
        {posts && posts.map((post) => <Post
            key={post.id}
            post={post}
            onEditPost={onEditPost}
            onToggledLikePost={handleRefreshPost}
            onPostDeleted={handleRefreshPost}
            onToggledSavePost={handleRefreshPost}
        />)}
    </section>
}
