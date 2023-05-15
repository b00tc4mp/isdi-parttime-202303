import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'
import Post from './Post.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import PropTypes from 'prop-types'

export default function Posts({onEditClicked, lastPostsUpdate}) {
    Posts.propTypes = {
        onEditClicked: PropTypes.func
    }

    let _posts

    try {
        _posts = retrievePosts(context.userId) 
    } catch(error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)
        
    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)

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
    
    console.log('Posts -> render')

    return <section className='posts-list'>
        { posts.map(post => <Post key={post.id} post={post} onToggledLikePost={handleRefreshPosts} onToggleSavePost={handleRefreshPosts} onEdit={onEditClicked}/>)}
    </section>
}