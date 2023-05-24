import BarActionIcon from "./BarActionIcon";

export default function ProfileBar ({postsToShow, handleFilterMyPosts, handleFilterSavedPosts, handleFilterLikedPosts, handleOpenSettings, modal}) {
    return <>{ postsToShow !== 'all' && 
    <footer>
        <ul className='profile-filters'>
            <BarActionIcon 
                actionOnClick={handleFilterMyPosts} 
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'mine' ? 'filled' : ''}`} 
                icon={'photo_library'}
            />
            <BarActionIcon 
                actionOnClick={handleFilterSavedPosts}
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'saved' ? 'filled' : '' }`}
                icon={'bookmark'}
            />
            <BarActionIcon 
                actionOnClick={handleFilterLikedPosts}
                iconClass={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'liked' ? 'filled' : ''}`}
                icon={'favorite'}
            />
            <BarActionIcon 
                actionOnClick={handleOpenSettings}
                iconClass={`menu-buttons material-symbols-rounded ${modal === 'profile' ? 'filled' : ''}`}
                icon={'settings'}
            />
        </ul>
    </footer> }</>
}