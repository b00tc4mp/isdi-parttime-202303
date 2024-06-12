import { retrieveUser } from "../../logic/helpers/data-managers"
import { context } from "../../ui"
import { posts } from "../../data"
import './ProfileInformation.css'

export default function ProfileInformation(){
    const _posts = posts()
    const user = retrieveUser(context.userId)
    return <div className="personal-profile-header">
    <img className="personal-profile-image" src={user.avatar} alt=""/>
    <div className="personal-profile-data-and-activity">
        <div className="personal-profile-data">
            <p className="personal-profile-username title">{user.username}</p>
            <p className="personal-profile-biography body-text">Very long biography of this person or avatar</p>
        </div>

        <div className="personal-profile-activity">
            <div className="personal-profile-activity-single">
                <p className="body-text-bold">{_posts.reduce((num, post) => (post.author === context.userId ? num+1 : num), 0)}</p>
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