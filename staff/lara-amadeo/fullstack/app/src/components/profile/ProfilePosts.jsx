import ProfilePost from "./ProfilePost"
import { context } from "../../ui"
import retrievePosts from "../../logic/retrievePosts"
import './ProfilePosts.css'
import { useState } from "react"
import { useContext } from "react"
import Context from "../../Context"
export default function ProfilePosts(){

    const [posts, setPosts] = useState()
    const { generateToast } = useContext(Context)

    try {
        retrievePosts(context.userId, (error, posts) => {
            if(error){
                generateToast(error.message,'error')
                console.log(error.stack)
                return
            }
            const userPosts = posts.filter(post => post.author.id === context.userId)
            setPosts(userPosts)
        })
    } catch(error) {
        generateToast(error.message,'error')
        console.log(error.stack)
    }
    
    return <>
    {posts && <div className="personal-profile-posts">
        {posts.map(post => <ProfilePost key={post.id} post={post} />)}
    </div>}</>
}