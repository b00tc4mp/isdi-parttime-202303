import { useHandleErrors } from "../hooks"
import { context } from '../../ui'
import { savePostAsSeen } from "../../logic"
import { RandomAvatar } from "react-random-avatars"

export default function Post({ post, handleTogglePostModal }) {
    const handleErrors = useHandleErrors()

    const { id, text, author, title } = post

    const handlePostScroll = event => {
        const post = event.target

        if (post.scrollTop + post.offsetHeight >= post.scrollHeight) {
            post.scrollTop = post.scrollHeight
            event.stopPropagation()
        }
    }

    const handleOpenPostModal = () => {
        handleErrors(async () => {
            await savePostAsSeen(id)
        })
        context.postId = id

        handleTogglePostModal()
    }

    console.debug('Post -> render')

    return <>
        <article className="bg-white border h-[450px] w-4/5 text-black rounded-md p-4 flex flex-col items-center overflow-hidden shadow-md shadow-slate-400" id={id.toString()} onScroll={handlePostScroll} onClick={handleOpenPostModal}>
            <section className="flex justify-between w-full p-2 overflow-hidden h-16">
                <div className="flex items-center">
                    {author.avatar
                        ?
                        <img className="h-8 w-8 object-cover rounded-full" src={author.avatar} alt="post-user-avatar" />
                        :
                        <RandomAvatar name={author.name} size={25} />
                    }
                    <p className="px-1">{author.name}</p>
                </div>
            </section>

            <h1 className="text-2xl text-center mb-2">{title}</h1>

            <section className="w-full overflow-hidden mb-1">{text}</section>
        </article>
    </>
} 