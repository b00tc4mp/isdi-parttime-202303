import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleFavPost from '../logic/toggleFavPost'
import formatTimeSince from "../logic/formatTimeSince"
import { useAppContext } from "../hooks"

import Panel from '../library/Panel'

import { utils } from 'com'
const { extractSubFromToken } = utils

//https://heroicons.com/
import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine, BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'

import './Post.css'

export default function Post({ post: { author, id, text, image, date, likes, fav }, onEditPost, onToggledLikePost, onToggledFavPost }) {
    console.debug('//// Post  -> Render')

    //CONTEXT/ALERTS/02// Use the context to return the object alert tha's define in the parent object App.jsx
    const { alert, freeze, unfreeze } = useAppContext()

    date = formatTimeSince(date)

    const handleOpenEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            //loader begins
            freeze()

            toggleLikePost(context.userId, id, (error) => {
                //loader ends
                unfreeze()
                if (error) {
                    //CONTEXT/ALERTS/01// an alert is called
                    alert(error.message)

                    return
                }
                onToggledLikePost()

            })

        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleFavPost = () => {
        try {
            freeze()
            toggleFavPost(context.userId, id, (error) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                onToggledFavPost();
            })

        } catch (error) {
            alert(error.message)
        }
    }


    const userId = extractSubFromToken(context.token)

    return (
        <Panel tag="article" className="post">
            <div className="post-info">
                <img className="user-avatar home-post-avatar" src={author.avatar} />
                <div>
                    <h3>{author.name}</h3>
                    <time>{date.toLocaleString()}</time>
                </div>
            </div>
            <div className="post-wrapper">

                <img className="home-post-image grayscale-img" src={image} alt="" />

                <div className="post-buttons-wrapper">

                    <button onClick={handleToggleFavPost} className="post-button fav-button icon">Fav
                        {fav ? <BookmarkIcon className="favIcon icon" /> : < BookmarkIconLine className="favIcon icon" />}
                    </button>

                    {author.id === userId ? <button className="post-button post-edit-button icon" onClick={handleOpenEditPost} name="edit"> <PencilIcon className="PencilIcon post-edit-button  icon" /> </button> : ''}
                    <button onClick={handleToggleLikePost} name="like" className="post-button post-like-button">
                        {likes && likes.includes(context.userId) ? <HeartIcon className="HeartIcon icon" /> : <HeartIconLine className="HeartIconLine icon" />} {likes && likes.length > 0 ? <span>{likes.length}</span> : ''}
                    </button>
                </div>
            </div>
            <p>{text}</p>
        </Panel>

    )

}
