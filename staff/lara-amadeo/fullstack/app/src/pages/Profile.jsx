import { useState } from "react"
import ProfileInformation from "../components/profile/ProfileInformation"
import ProfileTabs from "../components/profile/ProfileTabs"
import ProfilePosts from "../components/profile/ProfilePosts"
import ProfileSavedPosts from "../components/profile/ProfileSavedPosts"
import './Profile.css'
import Header from "../components/Header"


export default function Profile() {

    const [view, setView] = useState('profilePosts')
    
    
    const handleShowProfilePosts = () => {
        setView('profilePosts')
    }

    const handleShowProfileSaved = () => {
        setView('profileSaved')
    }


    return <div className="w-full h-screen flex flex-col mt-[10px] px-[40px] box-border max-md:mt-[74px] max-md:px-[16px]">
        {<Header title={'Profile'} secondaryButtonText={'Edit'} />}
        {<ProfileInformation />}
        {<ProfileTabs state={view} onPostsTabClick={handleShowProfilePosts} onSavedTabClick={handleShowProfileSaved}/>}
        {view === 'profilePosts' && <ProfilePosts />}
        {view === 'profileSaved' && <ProfileSavedPosts />}

    </div>
    
}