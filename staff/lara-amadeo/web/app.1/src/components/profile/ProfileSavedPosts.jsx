import { useState } from "../react"
import { context, errorToast, generateToast } from "../../ui"
import ProfileSavedPost from "./ProfileSavedPost"
import './ProfileSavedPosts.css'
import retrieveSavedPosts from "../../logic/retrieveSavedPosts"

export default function ProfileSavedPosts(){

    const [savedPosts, setSavedPosts] = useState()
    
    try{
        retrieveSavedPosts(context.userId, (error, posts) => {
            if(error){
                generateToast({
                       message: error.message + error.stack,
                    type: errorToast
                })
                return
            }
            setSavedPosts(posts)
        })
    } catch (error){
        generateToast({
            message: error.message,
            type: errorToast
        })
    }

    return <>
    {savedPosts && <div className="personal-profile-posts">
    {savedPosts.map(post => <ProfileSavedPost key={post.id} post={post} />)}
    </div>}
    </>
}