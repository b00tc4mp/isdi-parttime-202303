
export default function ProfileNavTab(props){

    function handleTabPosts(){
        props.onPostsTabClick()
    }

    function handleTabSaved(){
        props.onSavedTabClick()
    }

    return <div className="tabs-container">
    <div className="tab-elem" onClick={handleTabPosts}>Posts{props.state === 'profilePosts' && <div className="tab-elem-selected"/>}</div>
    <div className="tab-elem" onClick={handleTabSaved}>Saved{props.state === 'profileSaved' && <div className="tab-elem-selected"/>}</div>
    <div className="tab-elem">Liked</div>
</div>
}


{/* <div className={props.state === 'profilePosts' ? "tab-elem tab-elem-selected" : 'tab-elem'} onClick={handleTabPosts}>Posts</div>
<div className={props.state === 'profileSaved' ? "tab-elem tab-elem-selected" : 'tab-elem'} onClick={handleTabSaved}>Saved</div> */}