import './ProfilePost.css'

export default function ProfilePost(props){
    return <div className="personal-profile-post-container">
    <img src={props.post.image} className="personal-profile-post-image"/>
    </div>
}