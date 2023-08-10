import { useAppContext, useHandleErrors } from "../hooks"
import { context } from '../../ui'

export default function Post({post, handleTogglePostModal }) {
  const { alert } = useAppContext()
  
  const { id, text, author, title } = post

  const handlePostScroll = event => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

  const handleOpenPostModal = () => {
    context.postId = id
    
    handleTogglePostModal()
  }

  console.debug('Post -> render')

  return <>
    <article className="bg-gray-100 h-[450px] w-80 text-black rounded-md p-4 flex flex-col items-center overflow-hidden" id={id.toString()} onScroll={handlePostScroll} onClick={handleOpenPostModal}>
      
        <section className="flex justify-between w-full px-4 py-2 overflow-hidden">
          <div className="flex items-center">
            <img className="h-8 w-8 object-cover rounded-full" src={author.avatar} alt="post-user-avatar" />
            <p className="px-1">{author.name}</p>
          </div>
        </section>
        
        <h1 className="text-2xl mb-2">{title}</h1>

        <section className="w-full overflow-hidden">{text}</section>
    </article>
  </>
} 