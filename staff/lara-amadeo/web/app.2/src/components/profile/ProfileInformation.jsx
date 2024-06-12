import retrieveUser from "../../logic/retrieveUser"
import { context } from "../../ui"
import './ProfileInformation.css'
import { useEffect, useState } from "react"
import retrievePosts from "../../logic/retrievePosts"

export default function ProfileInformation(){

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()

   useEffect(() => {
       try {
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    generateToast({
                        message: error.message + error.stack,
                        type: errorToast
                    })
                    return
                }
                setUser(user)
    
                retrievePosts(context.userId, (error, posts) => {
                    if(error){
                        generateToast({
                            message: error.message + error.stack,
                            type: errorToast
                        })
                        return
                    }
                    setPosts(posts)
                })
            })
        } catch { 
            generateToast({
                message: error.message + error.stack,
                type: errorToast
            })
        }
   },[]) 

    return <div className="personal-profile-header">
    {user && <img className="personal-profile-image" src={user.avatar} alt=""/>}
    <div className="personal-profile-data-and-activity">
        <div className="personal-profile-data">
            {user && <p className="personal-profile-username title">{user.username}</p>}
            <p className="personal-profile-biography body-text">Very long biography of this person or avatar</p>
        </div>

        <div className="personal-profile-activity">
            <div className="personal-profile-activity-single">
                {posts && <>
                <p className="body-text-bold">{posts.reduce((num, post) => (post.author.id === context.userId ? num+1 : num), 0)}</p>
                </>}
                <p className="body-text">posts</p>
            </div>

            <div className="personal-profile-activity-single">
                <p className="body-text-bold">23</p>
                <p className="body-text">followers</p>
            </div>

            <div className="personal-profile-activity-single">
                <p className="body-text-bold">23</p>
                <p className="body-text">following</p>
            </div>
        </div>
    </div>
</div>
}