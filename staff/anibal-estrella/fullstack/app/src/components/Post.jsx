import { context, getUserId, isCurrentUser } from "../logic"
import { toggleLikePost, toggleFavPost } from '../logic'
import { useAppContext } from "../hooks"
import formatTimeSince from "../logic/formatTimeSince"

import Panel from '../library/Panel'

import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconLine, BookmarkIcon as BookmarkIconLine } from '@heroicons/react/24/outline'

// import './Post.css'

export default ({ post: { author, id, text, image, date, likes, fav }, onEditPost, onToggledLikePost, onToggledFavPost }) => {
    console.debug('//// Post  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()

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

    const isCurrentUserPost = isCurrentUser(author.id)

    return (
        <Panel tag="article" className="flex flex-row bg-gray-300 mx-4 mb-4" >


            <div className="p-4">
                <img className="w-full grayscale rounded-md hover:grayscale-0 ease-in duration-300 " src={image} alt="" />
                <div className="flex flex-col w-full pt-4">
                    <div className="flex flex-row flex-grow-1 px-4 py-0">
                        <img className="w-12 h-12 rounded-full aspect-square border-2 border-red " src={author.avatar} />
                        <div className="pl-2">
                            <h3 className="font-bold mb-[-.5rem] ">{author.name}</h3>
                            <time className="text-white text-xs text-gray-100 ">{date.toLocaleString()}</time>
                        </div>
                    </div>
                    <p className="p-4">{text}</p>
                </div>
            </div>

            <div className="bg-gray-400 rounded-e-lg w-12 p-2 pt-4 ">
                <div className="flex sticky top-16 flex-col	w-full justify-center">
                    <button onClick={handleToggleLikePost} name="like" className=" pb-4 flex w-6 flex-col text-white transition ease-in-out hover:text-red duration-500">
                        {likes && likes.includes(getUserId()) ? <HeartIcon className="" /> : <HeartIconLine className="" />} {likes && likes.length > 0 ? <span className=" w-full text-center text-sm text-gray-200">{likes.length}</span> : ''}
                    </button>

                    <button onClick={handleToggleFavPost} className=" pb-6 justify-center flex w-6 flex-col text-[0px] text-white transition ease-in-out hover:text-red duration-500">Fav{fav ? <BookmarkIcon className="" /> : < BookmarkIconLine className="" />}
                    </button>

                    {isCurrentUserPost ? <button className="justify-center flex  w-6 flex-col text-[0px] text-white transition ease-in-out hover:text-red duration-500" onClick={handleOpenEditPost} name="edit"> <PencilIcon /> </button> : ''}
                </div>
            </div>
        </Panel>

    )

}
