import { useEffect, useState } from "react"
import retrieveUser from "../logic/retrieveUser"
import { context, errorToast, generateToast } from "../ui"
import './TopbarMenu.css'

export default function TopbarMenu({ onSettingsButton, onProfileAvatarButton, onBurguerButton, lastUserRenderUpdate }){

    const [user, setUser] = useState()

    useEffect(() => {refreshUserRender()},[])

    const handleGoToSettings = () => {
        onSettingsButton()
    }

    const handleGoToProfile = () => {
        onProfileAvatarButton()
    }

    const handleOpenSidebar = () => {
        onBurguerButton()
    }

    const refreshUserRender = () => {
      try{
            retrieveUser(context.userId, (error, user) =>{
                if(error){
                    generateToast({
                        message: error.message,
                        type: errorToast
                    })
                    
                    return
                }
                setUser(user)
            })
        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    useEffect(() => {
        refreshUserRender()
    },[lastUserRenderUpdate])

    return <div className="topbar-container">
    <div className="topbar-left-side">
        <div className="avatar-icon-m-container" onClick={handleOpenSidebar}><span className="material-symbols-rounded icon-s topbar">menu</span></div>
    </div>
    <div className="topbar-right-side">
        <div onClick={handleGoToSettings} className="avatar-icon-m-container pointer"><span className="material-symbols-rounded icon-s topbar">settings</span></div>

        {user && <img onClick={handleGoToProfile} src={user.avatar ? user.avatar : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="} className="topbar-avatar pointer"></img>}
    </div>
</div>
}