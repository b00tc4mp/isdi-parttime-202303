import ProfilePost from "./ProfilePost"
import { context } from "../../ui"
import retrievePosts from "../../logic/retrievePosts"
import './ProfilePosts.css'
import { useState } from "react"

export default function ProfilePosts(props){

    const [posts, setPosts] = useState()

    try {
        retrievePosts(context.userId, (error, posts) => {
            if(error){
                generateToast({
                    message: error.message + error.stack,
                    type: errorToast
                })
                return
            }
            const userPosts = posts.filter(post => post.author.id === context.userId)
            setPosts(userPosts)
        })
    } catch {
        generateToast({
            message: error.message + error.stack,
            type: errorToast
        })
    }
    
    return <>
    {posts && <div className="personal-profile-posts">
        {posts.map(post => <ProfilePost key={post.id} post={post} />)}
    </div>}</>
}