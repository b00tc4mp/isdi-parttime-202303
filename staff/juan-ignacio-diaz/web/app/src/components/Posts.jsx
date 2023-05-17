import { useState, useEffect } from 'react'
import { context } from '../ui'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'
import retrieveUserPosts from '../logic/retrieveUserPosts'
import retrieveSavePosts from '../logic/retrieveSavePosts'

export default function Posts({ onEditedPost, typePosts, lastPostsUpdate, onMenssageAlert }) {
    console.log('Posts -> render')

    let tmpPosts

    try {   
        console.log(typePosts)
        if (typePosts === 'all')     
            tmpPosts = retrievePosts(context.userId)
        else if (typePosts === 'user') 
            tmpPosts = retrieveUserPosts(context.userId)
        else if (typePosts === 'save') 
            tmpPosts = retrieveSavePosts(context.userId)
    }
    catch (error) {
        onMenssageAlert(error.message)
    }  
    
    const [posts, setPosts] =useState(tmpPosts)

    const handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')

        let tmpPosts

        try {
            console.log(typePosts)
            if (typePosts === 'all')     
                tmpPosts = retrievePosts(context.userId)
            else if (typePosts === 'user') 
                tmpPosts = retrieveUserPosts(context.userId)
            else if (typePosts === 'save') 
                tmpPosts = retrieveSavePosts(context.userId)
    
            setPosts(tmpPosts)
        }
        catch (error) {
            onMenssageAlert(error.message)
        }  
    }

    // useEffect(() => {
    //     console.log('Posts -> "componentDidMount" with hooks')

    //     return () => console.log('Posts -> "componentWillUnmount" with hooks')
    // }, [])

    useEffect(() => {
        console.log('Posts -> "componentWillReceiveProps" with hooks')
        console.log(typePosts)
        console.log(lastPostsUpdate)
        
        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate, typePosts])

    return <>
        <section>
            {posts.map(post => <Post 
                key={post.id} 
                post={post} 
                onModifyPost={handleRefreshPosts}
                onEditPost={onEditedPost}
                onMenssageAlert={onMenssageAlert}
            />)}
        </section>
    </>
}