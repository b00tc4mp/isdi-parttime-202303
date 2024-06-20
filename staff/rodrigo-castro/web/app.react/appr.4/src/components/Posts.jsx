import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import PropTypes from 'prop-types'
import { retrieveUser } from '../logic/retrieveUser'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'

export default function Posts({onEditClicked, lastPostsUpdate, postsToShow}) {
    Posts.propTypes = {
        onEditClicked: PropTypes.func
    }

    let _posts
    let user

    try {
        _posts = retrievePosts(context.userId)

        user = retrieveUser(context.userId)
    } catch(error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)
        
    const handleRefreshPosts = () => {
        try {
            let posts
            
            if (postsToShow === 'all')
                posts = retrievePosts(context.userId)
            else if(postsToShow === 'saved')
                if(user.savedPosts)
                    posts = retrieveSavedPosts(context.userId)
                else
                    posts = []
                    
            setPosts(posts)
        } catch(error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Posts -> "componentDidMount" with hooks')

        return () => console.log('Posts -> "componentWillUnmount" with hooks')
    })

    useEffect(() => {
        console.log('Posts -> "componentWillRecieveProps" with hooks')

        if(lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate])

    useEffect(() => {
        console.log('Posts -> "componentWillRecieveProps" with hooks')

        handleRefreshPosts()
    }, [postsToShow])
    
    console.log('Posts -> render')

    return <section className='posts-list'>
        { posts.map(post => <Post key={post.id} post={post} onToggledLikePost={handleRefreshPosts} onToggleSavePost={handleRefreshPosts} onEdit={onEditClicked}/>)}
    </section>
}