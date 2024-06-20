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
    const [posts, setPosts] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrievePosts(context.userId, (error, posts) => {
                if(error){
                    alert(error.message)
    
                    return
                }
    
                setPosts(posts)
            })

            retrieveUser(context.userId, (error, user) => {
                if(error){
                    alert(error.message)
        
                    return
                }
        
                setUser(user) 
            })
        } catch(error) {
            alert(error.message)
        }
    }, [])

    const handleRefreshPosts = () => {
        try {            
            if (postsToShow === 'all'){
                retrievePosts(context.userId, (error, posts) => {
                    if(error){
                        alert(error.message)
        
                        return
                    }
        
                    setPosts(posts)
                })
            } else if(postsToShow === 'saved'){
                if(user.savedPosts)
                    retrieveSavedPosts(context.userId, (error, posts) => {
                        if(error){
                            alert(error.message)

                            return
                        }

                        setPosts(posts)
                    })
                else
                    setPosts([])
            }
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
        { posts && posts.map(post => <Post key={post.id} post={post} onToggledLikePost={handleRefreshPosts} onToggleSavePost={handleRefreshPosts} onEdit={onEditClicked}/>)}
    </section>
}