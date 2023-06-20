import { context, errorToast, generateToast } from '../../ui.js'
import retrievePosts from '../../logic/retrievePosts.js'
import Post from './Post.jsx'
import Header from '../Header.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import './Posts.css'

export default function Posts(props){

    const [posts, setPosts] = useState()

    useEffect(()=> {
        handleRefreshPosts()
    },[])

    const handleRefreshPosts = () => {
        try {
            retrievePosts(context.userId, (error, posts)=> {
                if(error){
                    generateToast({
                        message: error.message + error.stack,
                        type: errorToast
                    })
                    return
                }
                setPosts(posts)
            })
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }
    

    const handleCreatePost = () => {
        props.onCreateButton()
    }

    const handleOpenEditModal = (id) => {
        props.onEditPostButtonClick(id)
    }
    
    const handleOpenDeleteModal = (id) => {
        props.onDeletePostButtonClick(id)
    }

    useEffect(() => {
        console.log('Posts -> componenteWillReceiveProps')
        if(props.lastPostUpdate) handleRefreshPosts()
    }, [props.lastPostUpdate])


    return <div className="feed">
            {<Header title={'Home'} primaryButtonText={'Create'} onPrimaryButton={handleCreatePost} />}
            <div className="posts">
                {posts && posts.map(post =>
                    <Post
                    key={post.id}
                    post={post}
                    onLikeButtonClick={handleRefreshPosts}
                    onSaveButtonClick={handleRefreshPosts}
                    onEditPostButton={handleOpenEditModal}
                    onDeletePostButton={handleOpenDeleteModal}
                    />)}
            </div>     
        </div>
    
}
