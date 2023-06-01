export default function ProfileSavedPost({ post }){
    return <div className="personal-profile-post-container">
    <img src={post.image} className="personal-profile-post-image"/>
    </div>
}