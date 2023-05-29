import { useState, useEffect, useContext } from 'react'

import { context } from '../ui'
import Context from '../context'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'
import retrieveUserPosts from '../logic/retrieveUserPosts'
import retrieveSavePosts from '../logic/retrieveSavePosts'

export default function Posts({ onEditedPost, typePosts, lastPostsUpdate }) {
    const { alert, freeze, unfreeze } = useContext(Context)

    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
   
    const handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')
        try{
            freeze()
            if (typePosts === 'all')  
                retrievePosts(context.userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            else if (typePosts === 'user') {  
                retrieveUserPosts(context.userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            }
            else if (typePosts === 'save') 
                retrieveSavePosts(context.userId, (error, posts) => {
                    unfreeze()
                    if (error) {
                        alert(error.message)

                        return
                    }

                    setPosts(posts)
                })
        }
        catch (error) {
            alert(error.message)
        }   
    }

    useEffect(() => {
        console.log('Posts -> "componentWillReceiveProps" with hooks')
        console.log(typePosts)
        console.log(lastPostsUpdate)
        
        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate, typePosts])

    return <>
        <section>
            {posts && posts.map(post => <Post 
                    key={post.id} 
                    post={post} 
                    onModifyPost={handleRefreshPosts}
                    onEditPost={onEditedPost}
                />)
            }
        </section>
    </>
}