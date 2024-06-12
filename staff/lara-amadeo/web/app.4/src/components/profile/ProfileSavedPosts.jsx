import { posts } from "../../data"
import { findUserbyId } from "../../logic/helpers/data-managers"
import { context, errorToast, generateToast } from "../../ui"
import ProfileSavedPost from "./ProfileSavedPost"

export default function ProfileSavedPosts(){
    let savedPosts
    
    try{
    const _posts = posts()
    const user = findUserbyId(context.userId)
    savedPosts = _posts.filter(post => user.savedPosts.includes(post.id))
    } catch (error){
        generateToast({
            message: error.message,
            type: errorToast
        })
    }

    return <div className="personal-profile-posts">
    {savedPosts.map(post => <ProfileSavedPost post={post} />)}
</div>
}