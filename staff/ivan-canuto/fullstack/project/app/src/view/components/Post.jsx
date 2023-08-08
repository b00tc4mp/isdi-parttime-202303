import { useEffect, useState } from "react"
import { toggleLikePost, toggleSavePost, retrieveUser } from "../../logic"
import Comments from "./Comments"
import { useAppContext, useHandleErrors } from "../hooks"
import { context } from '../../ui'

export default function Post({post, handleRefreshPosts, openPostModal }) {
  const { alert } = useAppContext()
  const handleErrors = useHandleErrors()

  const [modal, setModal] = useState('post')
  const [user, setUser] = useState()
  
  const { id, likes, date, text, author, visible, fav, liked, title } = post

  const handleCloseCommentModal = () => {
    setModal('post')
    handleRefreshPosts()
  }

  const handleRefreshUser = () => {
    handleErrors(async () => {
      const user = await retrieveUser()

      setUser(user)
    })
  }

  useEffect(() => {
    handleRefreshUser()
  }, [])

  const handlePostScroll = event => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

  const handleOpenPostModal = () => {
    context.postId = id
    
    openPostModal()
  }

  console.debug('Post -> render')

  return <>
    <article className="bg-gray-100 h-96 w-80 text-black rounded-md p-2 flex flex-col items-center overflow-auto" id={id.toString()} onScroll={handlePostScroll} onClick={handleOpenPostModal}>
      
      {modal === 'post' && <>
        <section className="flex justify-between w-full px-4 py-2">
          <div className="flex items-center">
            <img className="h-8 w-8 object-cover rounded-full" src={author.avatar} alt="post-user-avatar" />
            <p className="px-1">{author.name}</p>
          </div>
        </section>
        
        {/* <section>
          <img className="w-80 mt-2" src={image}/>
        </section> */}

        <h1 className="text-2xl mb-2">{title}</h1>

        <section className="w-full px-4">{text}</section>
      </>}
      
      {modal === 'comments' && <Comments
        handleRefreshPosts={handleRefreshPosts}
        onCloseCommentModal={handleCloseCommentModal}
        post={post}
      />}
    </article>
  </>
} 