import { context } from '../../ui.js'
import retrievePosts from '../../logic/retrievePosts.js'
import Post from './Post.jsx'
import Header from '../Header.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import { useContext } from 'react'
import Context from '../../Context.js'

export default function Posts({ onCreateButton, onEditPostButtonClick, onDeletePostButtonClick, onVisibilityButton, lastPostUpdate, onSellPostButton, onBuyPostButton }){

    const [posts, setPosts] = useState()
    const { generateToast, freeze, unfreeze } = useContext(Context)
    

    
    useEffect(()=> {
        handleRefreshPosts()
    },[])

    const handleRefreshPosts = () => {
        freeze('overlay')
        try {
            retrievePosts(context.userId, (error, posts)=> {
                if(error){
                    generateToast(error.message,'error')
                    console.log(error.stack)
                    unfreeze()
                    return
                }
                unfreeze()
                setPosts(posts.filter(post => !(post.author.id !== context.userId && post.visibility === 'private')))
            })
        } catch(error){
            unfreeze
            generateToast(error.message,'error')
        }
    }

    const handleCreatePost = () => {
        onCreateButton()
    }

    const handleOpenEditModal = (id) => {
        onEditPostButtonClick(id)
    }
    
    const handleOpenDeleteModal = (id) => {
        onDeletePostButtonClick(id)
    }

    const handleOpenVisibilityModal = (id) => {
        onVisibilityButton(id)
    }

    const handleOpenSellPostModal = id => {
        onSellPostButton(id)
    }

    const handleOpenBuyPostModal = id => {
        onBuyPostButton(id)
    }


    useEffect(() => {
        console.log('Posts -> componenteWillReceiveProps')
        if(lastPostUpdate) handleRefreshPosts()
    }, [lastPostUpdate])


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
                    onVisibilityButton={handleOpenVisibilityModal}
                    onSellPostButton={handleOpenSellPostModal}
                    onBuyPostButton={handleOpenBuyPostModal}
                    />)}
            </div>     
        </div>
    
}
