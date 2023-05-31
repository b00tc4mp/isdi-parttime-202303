import { useEffect, useState } from "react"
import retrievePostsUser from "../logic/retrievePostsUser"
import { context } from "../ui"
import Post from "./Post"

const PostsUser = ({onEditPost, lastPostUpdate}) => {

  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    try{    
      retrievePostsUser(context.userId, (error, postsUser) => {
        if (error) {
          alert(error.message)
        }
  
        setUserPosts(postsUser)
  
      })
  
    } catch (error){
      alert(error.message)
    }
  }, [])

const handleRefreshPost = () => {
  try{    
    retrievePostsUser(context.userId, (error, postsUser) => {
      if (error) {
        alert(error.message)
      }

      setUserPosts(postsUser)

    })

  } catch (error){
    alert(error.message)
  }
};

useEffect(() =>{
    if(lastPostUpdate) handleRefreshPost()
}, [lastPostUpdate]);

return <section className='container'>            
    { userPosts && userPosts.map(post => 
    <Post 
        key={post.id} 
        onEdit={onEditPost}
        onLike={handleRefreshPost}
        onFavourite={handleRefreshPost}
        onDelete={handleRefreshPost}
        post={post} 
        />)
    }
</section>
}

export default PostsUser