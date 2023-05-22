import { useState, useEffect } from 'react'
import { context } from '../ui'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'
import retrieveUserPosts from '../logic/retrieveUserPosts'
import retrieveSavePosts from '../logic/retrieveSavePosts'

export default function Posts({ onEditedPost, typePosts, lastPostsUpdate, onMenssageAlert }) {
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
   
    const handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')
        try{
            if (typePosts === 'all')     
                retrievePosts(context.userId, (error, posts) => {
                    if (error) {
                        onMenssageAlert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            else if (typePosts === 'user') 
                retrieveUserPosts(context.userId, (error, posts) => {
                    if (error) {
                        onMenssageAlert(error.message)

                        return
                    }

                    setPosts(posts)
                })
            else if (typePosts === 'save') 
                retrieveSavePosts(context.userId, (error, posts) => {
                    if (error) {
                        onMenssageAlert(error.message)

                        return
                    }

                    setPosts(posts)
                })
        }
        catch (error) {
            onMenssageAlert(error.message)
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
                    onMenssageAlert={onMenssageAlert}
                />)
            }
        </section>
    </>
}