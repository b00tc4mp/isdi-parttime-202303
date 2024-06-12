import ProfilePost from "./ProfilePost"
import { context } from "../../ui"
import retrievePosts from "../../logic/retrievePosts"

export default function ProfilePosts(props){
    const _posts = retrievePosts(context.userId)
    const userPosts = _posts.filter(post => post.author === context.userId)
    return <div className="personal-profile-posts">
        {userPosts.map(post => <ProfilePost post={post} />)}
    </div>
}