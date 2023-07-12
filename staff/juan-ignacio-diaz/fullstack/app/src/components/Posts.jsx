import { useState, useEffect } from 'react'

import { useAppContext } from '../hooks'

import Post from './Post.jsx'

import { retrievePosts, retrieveUserPosts, retrieveSavePosts, retrieveOnSalePosts } from '../logic'

export default function Posts({ onEditedPost, onAddedPriceToPost , typePosts, lastPostsUpdate }) {
    console.log('Posts -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
   
    const handleRefreshPosts = ()  => {
        console.log('Posts -> refresh')
        try{
            freeze()
            if (typePosts === 'all')  
                retrievePosts()
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())

            else if (typePosts === 'user') 
                retrieveUserPosts()
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())

            else if (typePosts === 'save') 
                retrieveSavePosts()
                    .then(posts => setPosts(posts))
                    .catch(error => alert(error.message))
                    .finally(() => unfreeze())
                    
            else if (typePosts === 'onSale') 
                retrieveOnSalePosts()
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
        // console.log(typePosts)
        // console.log(lastPostsUpdate)
        
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