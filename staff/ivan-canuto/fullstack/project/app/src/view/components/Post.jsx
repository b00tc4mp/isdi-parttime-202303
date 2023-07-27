import { useEffect, useState } from "react"
import { toggleLikePost, toggleSavePost, retrieveUser } from "../../logic"
import Comments from "./Comments"
import { Button } from "../library";
import { useAppContext } from "../hooks"
import { context } from '../../ui'

export default function Post({post, handleRefreshPosts, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost, handleOpenBuyPost }) {
  
  const [modal, setModal] = useState('post')
  const [contextualMenu, setContextualMenu] = useState('close')
  const [user, setUser] = useState()
  
  const { alert } = useAppContext()
  const { image, id, likes, date, text, author, visible, onSale, fav, liked } = post

  const handleCloseCommentModal = () => {
    setModal('post')
    handleRefreshPosts()
  }

  const handleRefreshUser = () => {
    try {
      retrieveUser()
        .then(user => {
          setUser(user)}
        )
        .catch(error => {
          alert(error.message)
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  useEffect(() => {
    handleRefreshUser()
  }, [])

  const handleToggleLike = () => {
    try {
      toggleLikePost(id)
        .then(() => handleRefreshPosts())
        .catch(error => {
          alert(error.message)
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message)
      console.debug(error.stack)
    }
  }

  const handleToggleFav = () => {
    try {
      toggleSavePost(id)
        .then(() => {
          handleRefreshPosts()
          handleRefreshUser()
        })
        .catch(error => {
          alert(error.message)
          console.debug(error.stack)
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
    context.postId = id
    document.body.classList.toggle('fixed-scroll')
    setContextualMenu(contextualMenu === 'close' ? 'open' : 'close')
  }

  console.debug('Post -> render')

  return <>
    <article className="bg-gray-100 h-96 w-96 text-black rounded-md p-2 flex flex-col items-center overflow-auto pb-6" id={id.toString()} onScroll={handlePostScroll}>

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
            <img className="h-8 w-8 object-cover rounded-full" src={author.avatar} alt="post-user-avatar" />
            <p className="px-1">{author.name}</p>
          </div>
          
          <div className="flex items-center">
            {user && (author.id === user.id) && <>
              <p className="mx-1">{visible ? 'Public' : 'Private'}</p>
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
              <span className="material-symbols-outlined hover:bg-gray-300 cursor-pointer font-black" onClick={toggleContextualMenu}>more_vert</span>
            </>}
            
            {user && (author.id !== user.id && onSale) &&
              <div className="h-8 bg-gray-300 rounded mx-1" title="Post on sale" onClick={() => {
                if(onSale !== 'Sold') {
                  context.postId = id
                  handleOpenBuyPost()
                }
                }}>
                {onSale !== 'Sold' && <Button><span className="material-symbols-outlined">local_mall</span>{`${onSale}€`}</Button>}
                {onSale === 'Sold' && <p className="text-base flex p-1"><span className="material-symbols-outlined">local_mall</span>Sold</p>}
              </div>}
          </div>
        </section>
        
        <section>
          <img className="w-80 mt-2" src={image}/>
        </section>

        <section className="pt-2 pl-4 pb-0 w-full flex justify-start">
          <i className="" onClick={handleToggleFav}>
              {user && fav ? <span className="material-symbols-outlined cursor-pointer filled saved">bookmark</span> : <span className="material-symbols-outlined cursor-pointer">bookmark</span>}
          </i>

          <i>
            <span className="material-symbols-outlined cursor-pointer" onClick={() => {
              context.postId = id
              setModal('comments')
            }}>mode_comment</span>
          </i>
          
          <i className="" onClick={handleToggleLike}>
            {user && liked ? <span className="material-symbols-outlined cursor-pointer filled liked">favorite</span> : <span className="material-symbols-outlined cursor-pointer">favorite</span>}
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