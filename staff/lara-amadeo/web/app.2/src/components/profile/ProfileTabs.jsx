import './ProfileTabs.css'


export default function ProfileTabs(props){

    function handleTabPosts(){
        props.onPostsTabClick()
    }

    function handleTabSaved(){
        props.onSavedTabClick()
    }

    return <div className="profile-tabs-container">
    <div className="profile-tab-elem" onClick={handleTabPosts}>Posts{props.state === 'profilePosts' && <div className="profile-tab-elem-selected"/>}</div>
    <div className="profile-tab-elem" onClick={handleTabSaved}>Saved{props.state === 'profileSaved' && <div className="profile-tab-elem-selected"/>}</div>
    <div className="profile-tab-elem">Liked</div>
</div>
}
