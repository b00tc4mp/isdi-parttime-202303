import retrieveUser from "../logic/retrieveUser";
import toggleFavouritePost from "../logic/toggleFavouritePost";
import toggleLikePost from "../logic/toggleLikePost";
import { context } from "../ui";


function Post({ post: { id, image, text, date, likes}, 
                onEditPostButton, 
                onLikePostButton,
                onFavouritePostButton
              }) {

  let retrievedUser
  
  try {
    retrievedUser = retrieveUser(context.userId)
    
  } catch (error){
    alert(error.message)
  }    

  function handleEditClick(){
    onEditPostButton(id)
  }

  function handleLikeClick(){

    try{
      toggleLikePost(id, context.userId)

      onLikePostButton()
    } catch(error) {
      alert(error.message)
    }
  }

  function handleFavouriteClick(){
    try{
      toggleFavouritePost(id, context.userId)

      onFavouritePostButton()
    } catch(error) {
      alert(error.message)
    }
  }

  return (
    <div className='post-users container'>
      <article>
        <div className='post-header'>
          <img className='post-avatar' src={retrievedUser.avatar} />
          <p className='post-author'>{retrievedUser.name}</p>
          <button className='button-edit' onClick={handleEditClick}>
            <i className='far fa-pen'></i> 
          </button>
          
        </div>
        <img className='post-image' src={image} />
        <div className='post-image-footer'>
          <button className='button-like' onClick={handleLikeClick}>
          {likes && likes.includes(retrievedUser.name) 
            ? <i className='fa fa-heart'></i> 
            : <i className='far fa-heart'></i>} 
          </button>
          <button className='button-favourites' onClick={handleFavouriteClick}>
          {retrievedUser.favourites && retrievedUser.favourites.includes(id) 
            ? <i className='fas fa-bookmark'></i> 
            : <i className='far fa-bookmark'></i>
          } 
          </button>
        </div>
        <div className='post-likes-info'>
         <p className='likes-count'>{likes ? likes.length : 0}</p> 
         <p className='likes-users'>{likes ? likes.join(', ') : ''}</p>
        </div>
        <p className='post-text'>{text}</p>
        <time>{date.toLocaleString()}</time>
      </article>
    </div>
  );

}

export default Post