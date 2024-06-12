import './ProfileTabs.css'


export default function ProfileTabs({ onPostsTabClick, onSavedTabClick, state }){

    function handleTabPosts(){
        onPostsTabClick()
    }

    function handleTabSaved(){
        onSavedTabClick()
    }

    return <div className="profile-tabs-container">
    <div className="profile-tab-elem" onClick={handleTabPosts}>Posts{state === 'profilePosts' && <div className="profile-tab-elem-selected"/>}</div>
    <div className="profile-tab-elem" onClick={handleTabSaved}>Saved{state === 'profileSaved' && <div className="profile-tab-elem-selected"/>}</div>
    <div className="profile-tab-elem">Liked</div>
</div>
}
