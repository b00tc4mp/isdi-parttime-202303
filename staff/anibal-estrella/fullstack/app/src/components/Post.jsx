import { context } from "../ui"
import { toggleLikePost, toggleFavPost } from '../logic/'
import formatTimeSince from "../logic/formatTimeSince"
import { useAppContext } from "../hooks"

import Panel from '../library/Panel'

import { utils } from 'com'
const { extractSubFromToken } = utils


import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine, BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'

import './Post.css'

export default ({ post: { author, id, text, image, date, likes, fav }, onEditPost, onToggledLikePost, onToggledFavPost }) => {
    console.debug('//// Post  -> Render')


    const { alert, freeze, unfreeze } = useAppContext()

    date = formatTimeSince(date)

    const handleOpenEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            freeze()

            toggleLikePost(context.token, id).then(() => {
                unfreeze()

                onToggledLikePost()
            })
                .catch((error) => {
                    unfreeze()

                    alert(error.message, 'error')
                })
        } catch (error) {
            unfreeze()
            alert(error.message, 'warn')
        }
    }

    const handleToggleFavPost = () => {
        try {
            freeze()
            toggleFavPost(context.token, id).then(() => {
                unfreeze()
                onToggledFavPost();
            })

        } catch (error) {
            unfreeze()

            alert(error.message, 'warn')
        }
    }


    const userId = extractSubFromToken(context.token)

    return (
        <Panel tag="article" className="rounded-lg bg-base shadow-lg  flex flex-row" >
            <div className="flex flex-col w-full py-4">
                <div className="flex flex-row flex-grow-1 pl-4 pb-2">
                    <img className="w-12 h-12 rounded-full aspect-square border-2 border-red " src={author.avatar} />
                    <div className="px-2">
                        <h3>{author.name}</h3>
                        <time className="text-white">{date.toLocaleString()}</time>
                    </div>
                </div>


                <div className="">
                    <img className="w-full grayscale hover:grayscale-0 ease-in duration-300 " src={image} alt="" />
                    <p className="pt-4 px-4">{text}</p>
                </div>
            </div>

            <div className="bg-back-100 rounded-e-lg w-12 p-2 justify-center">
                <button onClick={handleToggleLikePost} name="like" className="post-button post-like-button">
                    {likes && likes.includes(userId) ? <HeartIcon className="HeartIcon icon" /> : <HeartIconLine className="HeartIconLine icon" />} {likes && likes.length > 0 ? <span>{likes.length}</span> : ''}
                </button>

                <button onClick={handleToggleFavPost} className="text-white pt-4 pb-6 justify-center flex  w-5 flex-col text-[0px]">Fav
                    {fav ? <BookmarkIcon className="" /> : < BookmarkIconLine className="" />}
                </button>

                {author.id === userId ? <button className="text-white justify-center flex  w-5 flex-col text-[0px]" onClick={handleOpenEditPost} name="edit"> <PencilIcon /> </button> : ''}
            </div>
        </Panel>

    )

}
