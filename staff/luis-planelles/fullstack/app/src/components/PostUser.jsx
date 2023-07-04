import { useEffect, useState } from "react";
import { useAppContext } from '../hooks';
import retrievePostsUser from "../logic/retrievePostsUser";
import { context } from "../ui";
import Post from "./Post";

const PostsUser = ({onEditPost, lastPostUpdate}) => {
  const { alert } = useAppContext()

  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    try{    
      retrievePostsUser(context.token, (error, postsUser) => {
        if (error) {
          alert(error.message)
        }
  
        setUserPosts(postsUser)
  
      })
  
    } catch (error){
      alert(error.message)
    }
  }, [])

const HandlerefreshPost = () => {
  try{    
    retrievePostsUser(context.token, (error, postsUser) => {
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
    if(lastPostUpdate) HandlerefreshPost()
}, [lastPostUpdate]);

return <section className='container'>            
    { userPosts && userPosts.map(post => 
    <Post 
        key={post.id} 
        onEdit={onEditPost}
        onLike={HandlerefreshPost}
        onFavourite={HandlerefreshPost}
        onDelete={HandlerefreshPost}
        post={post} 
        />)
    }
</section>
}

export default PostsUser