import { context, errorToast, generateToast } from '../../ui.js'
import retrievePosts from '../../logic/retrievePosts.js'
import Post from './Post.jsx'
import Header from '../Header.jsx'
import { useState } from '../react/index.js'
import { useEffect } from '../react/index.js'
import './Posts.css'

export default function Posts(props){

    let _posts
    try {
        _posts = retrievePosts(context.userId)
    } catch(error){
        generateToast({
            message: error.message,
            type: errorToast
        })
    }

    const [posts, setPosts] = useState(_posts) 

    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)
            setPosts(posts)
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
        {console.log('Posts -> render')}
            {<Header title={'Home'} primaryButtonText={'Create'} onPrimaryButton={handleCreatePost} />}
            <div className="posts">
                {posts.map(post =>
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
