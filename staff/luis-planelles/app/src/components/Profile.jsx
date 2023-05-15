import retrievePosts from "../logic/retrievePosts";
import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui";
import './Profile.css';

const  Profile = () => {
    let postsRetrieved
    let userRetrieved 

    try{
        postsRetrieved = retrievePosts(context.userId)
        userRetrieved = retrieveUser(context.userId)

    }catch (error){
        alert(error.message)
    }
            
    return <section className="profile-container">
    <div className="profile">
    <div className="profile-info">
      <div className="profile-info-header">
        <img className="profile-user-avatar" src={userRetrieved.avatar} alt="User Avatar" />
        <p className="profile-user-name">{userRetrieved.name}</p>
      </div>
      <div className="profile-posts">
        {postsRetrieved.map((post) => (
            <img
            className="profile-post-image"
            src={post.image}
            key={post.id}
            alt={post.title}
            />
        ))}
      </div>
  </div>
  </div>
  </section>
}

export default Profile