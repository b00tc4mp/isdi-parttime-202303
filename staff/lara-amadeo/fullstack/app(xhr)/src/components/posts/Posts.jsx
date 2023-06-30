import { context } from '../../ui.js'
import retrievePosts from '../../logic/retrievePosts.js'
import Post from './Post.jsx'
import Header from '../Header.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import { useContext } from 'react'
import Context from '../../Context.js'
import { extractSubFromToken } from '../../logic/helpers/utils.js'

export default function Posts({ onCreateButton, onEditPostButtonClick, onDeletePostButtonClick, onVisibilityButton, lastPostUpdate, onSellPostButton, onBuyPostButton }) {

    const [posts, setPosts] = useState()
    const { generateToast, freeze, unfreeze } = useContext(Context)

    const userId = extractSubFromToken(context.token)

    useEffect(() => {
        handleRefreshPosts()
    }, [])

    const handleRefreshPosts = () => {
        freeze('overlay')
        try {
            retrievePosts(context.token, (error, posts) => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)
                    unfreeze()
                    return
                }
                unfreeze()
                const _posts = posts.filter(post => !(post.author.id !== userId && post.visibility === 'private'))
                setPosts(_posts.toReversed())
            })
        } catch (error) {
            unfreeze
            generateToast(error.message, 'error')
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
        if (lastPostUpdate) handleRefreshPosts()
    }, [lastPostUpdate])


    return <div className="w-auto flex flex-col items-center mt-[40px] px-[40px] max-md:px-[16px] max-md:mt-[84px]">
        {<Header title={'Home'} primaryButtonText={'Create'} onPrimaryButton={handleCreatePost} />}
        <div className="max-w-[440px] h-fit flex flex-col items-start gap-[40px]">
            {posts && posts.map(post =>
                <Post
                    key={post._id}
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
