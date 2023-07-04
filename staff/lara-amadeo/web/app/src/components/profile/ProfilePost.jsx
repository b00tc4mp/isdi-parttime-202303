import './ProfilePost.css'

export default function ProfilePost({ post }){
    return <div className="personal-profile-post-container">
    <img src={post.image} className="personal-profile-post-image"/>
    <span className="material-symbols-rounded icon-s profile-visibility-icon ">{post.visibility === 'private' ? 'lock' : ''}</span>
    </div>
}