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

    // date = formatTimeSince(toISOString(date))
    date = formatTimeSince(new Date(date))

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
        <Panel tag="article" className="flex flex-row bg-gray-300" >
            <div className="flex flex-col w-full">
                <div className="flex flex-row flex-grow-1 p-4 pb-0">
                    <img className="w-12 h-12 rounded-full aspect-square border-2 border-red " src={author.avatar} />
                    <div className="pl-2">
                        <h3 className="font-bold ">{author.name}</h3>
                        <time className="text-white">{date.toLocaleString()}</time>
                    </div>
                </div>

                <div className="">
                    <p className="p-4">{text}</p>
                    <img className="w-full grayscale hover:grayscale-0 ease-in duration-300 rounded-3xl p-4 overflow-hidden
" src={image} alt="" />
                </div>
            </div>

            <div className="bg-gray-400 rounded-e-lg w-12 p-2 pt-4 ">
                <div className="flex sticky top-16 flex-col	w-full justify-center">
                    <button onClick={handleToggleLikePost} name="like" className="text-white pb-4 flex w-6 flex-col ">
                        {likes && likes.includes(userId) ? <HeartIcon className="" /> : <HeartIconLine className="" />} {likes && likes.length > 0 ? <span className=" w-full text-center text-sm text-gray-200">{likes.length}</span> : ''}
                    </button>

                    <button onClick={handleToggleFavPost} className="text-white pb-6 justify-center flex w-6 flex-col text-[0px]">Fav
                        {fav ? <BookmarkIcon className="" /> : < BookmarkIconLine className="" />}
                    </button>

                    {author.id === userId ? <button className="text-white justify-center flex  w-6 flex-col text-[0px]" onClick={handleOpenEditPost} name="edit"> <PencilIcon /> </button> : ''}
                </div>
            </div>
        </Panel>

    )

}
