import { useEffect, useState } from "react"
import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import toggleSavePost from "../logic/toggleSavePost"
import Comments from "./Comments"
import ContextualMenu from "./ContextualMenuModal"
import Button from "../library/Button";
import { useAppContext } from "../hooks"
import retrieveUser from "../logic/retrieveUser"

export default function Post({post, handleRefreshPosts, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost, handleOpenBuyPost }) {
  
  const [modal, setModal] = useState('post')
  const [contextualMenu, setContextualMenu] = useState('close')
  const [user, setUser] = useState()
  
  const { alert, freeze, unfreeze } = useAppContext()
  const { image, _id, likes, date, text, author, visible, onSale } = post

  const handleCloseCommentModal = () => {
    setModal('post')
    handleRefreshPosts()
  }

  const handlreRefreshUser = () => {
    retrieveUser(context.userId, (error, _user) => {
      if(error) {
        alert(error.message)
        console.debug(error.stack)

        return
      }

      setUser(_user)
    })
  }

  useEffect(() => {
    handlreRefreshUser()
  }, [])
  

  const handleToggleLike = () => {
    try {
      freeze()
      
      toggleLikePost(context.userId, _id, (error) => {
        unfreeze()

        if (error) {
          alert(error.message)
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
      })

    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  const handleToggleFav = () => {
    try {
      freeze()

      toggleSavePost(context.userId, _id, (error) => {
        unfreeze()

        if (error) {
          alert(error.message)
          console.debug(error.stack)

          return
        }
        
        handleRefreshPosts()
        handlreRefreshUser()
      })
      
    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  const handlePostScroll = (event) => {
    const post = event.target

    if(post.scrollTop + post.offsetHeight >= post.scrollHeight) {
      post.scrollTop = post.scrollHeight
      event.stopPropagation()
    }
  }

  const toggleContextualMenu = () => {
    context.postId = _id.toString()
    document.body.classList.toggle('fixed-scroll')
    setContextualMenu(contextualMenu === 'close' ? 'open' : 'close')
  }

  console.debug('Post -> render')

    return <>
    <article className="bg-gray-100 h-96 w-96 text-black rounded-md p-2 flex flex-col items-center overflow-auto pb-6" id={_id.toString()} onScroll={handlePostScroll}>

      {contextualMenu === 'open' &&  <ContextualMenu
        options={[
          {text: 'Edit post', onClick: handleOpenEditPost},
          {text: 'Delete post', onClick: handleOpenDeletePost},
          {text: `Set post ${visible ? 'private' : 'public'}`, onClick: handleToggleVisibility},
          {text: `${!onSale ? 'Set post on sale' : onSale !== 'Sold' ? 'Remove post form sale' : 'Sold post'}`, onClick: onSale !== 'Sold' ? handleToggleOnSalePost : undefined}
        ]}
        toggleContextualMenu={toggleContextualMenu}
      />}
      
      {modal === 'post' && <>
        <section className="flex justify-between w-full px-4 py-2">
          <div className="flex items-center">
            <img className="h-8 rounded" src={author.avatar} alt="post-user-avatar" />
            <p className="px-1">{author.name}</p>
          </div>
          
          <div className="flex items-center">
            {(author.id === context.userId) && <>
              <p>{visible ? 'Public' : 'Private'}</p>
              {(onSale && onSale !== 'Sold') && <>
                <div className="bg-gray-300 p-1 rounded mx-2 flex"> 
                  <span className="material-symbols-outlined">local_mall</span>
                  <p>{`${onSale}€`}</p>
                </div>
              </>}
              {(onSale && onSale === 'Sold') && <>
                <div className="bg-gray-300 p-1 rounded mx-1 flex">
                  <span className="material-symbols-outlined">local_mall</span>
                  <p>{`Sold`}</p>
                </div>
              </>}
              <span className="material-symbols-outlined hover:bg-gray-300 cursor-pointer font-black ml-2" onClick={toggleContextualMenu}>more_vert</span>
            </>}
            
            {(author.id !== context.userId && onSale) &&
              <div className="h-8 bg-gray-300 rounded mx-1" title="Post on sale" onClick={() => {
                if(onSale !== 'Sold') {
                  context.postId = _id
                  handleOpenBuyPost()
                }
                }}>
                {onSale !== 'Sold' && <Button><span className="material-symbols-outlined px-1">local_mall</span>{`${onSale}€`}</Button>}
                {onSale === 'Sold' && <p className="text-base flex p-1"><span className="material-symbols-outlined">local_mall</span>Sold</p>}
              </div>}
          </div>
        </section>
        
        <section>
          <img className="w-80 mt-2" src={image}/>
        </section>

        <section className="pt-2 pl-4 pb-0 w-full flex justify-start">
          <i className="" onClick={handleToggleFav}>
              {user && (!user.favs.includes(_id))? <span className="material-symbols-outlined cursor-pointer">bookmark</span> : <span className="material-symbols-outlined cursor-pointer filled saved">bookmark</span>}
          </i>

          <i>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => {
              context.postId = _id
              setModal('comments')
            }}>mode_comment</span>
          </i>
          
          <i className="" onClick={handleToggleLike}>
            {(!likes || !likes.includes(context.userId))? <span className="material-symbols-outlined cursor-pointer">favorite</span> : <span className="material-symbols-outlined cursor-pointer filled liked">favorite</span>}
          </i>

          <p>{likes ? likes.length + ' likes' : '0 likes'}</p>
          <p className="ml-2">{date}</p>
        </section>

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