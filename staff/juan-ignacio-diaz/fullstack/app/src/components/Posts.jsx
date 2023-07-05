import { useState, useEffect } from 'react'

import { context } from '../ui'
import { useAppContext } from '../hooks'

import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts'
import retrieveUserPosts from '../logic/retrieveUserPosts'
import retrieveSavePosts from '../logic/retrieveSavePosts'
import retrieveOnSalePosts from '../logic/retrieveOnSalePosts'

export default function Posts({ onEditedPost, onAddedPriceToPost , typePosts, lastPostsUpdate }) {
    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
   
    const handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')
        try{
            freeze()
            if (typePosts === 'all')  
                retrievePosts(context.token)
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())

            else if (typePosts === 'user') 
                retrieveUserPosts(context.token)
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())

            else if (typePosts === 'save') 
                retrieveSavePosts(context.token)
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())
                    
            else if (typePosts === 'onSale') 
                retrieveOnSalePosts(context.token)
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())           
        }
        catch (error) {
            unfreeze()
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
                    onAddPriceToPost={onAddedPriceToPost}
                />)
            }
        </section>
    </>
}