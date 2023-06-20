import { useEffect } from "react"
import { retrieveUser } from "../logic/helpers/data-managers"
import { context, errorToast, generateToast } from "../ui"
import './SidebarMenu.css'

export default function SidebarMenu(props){

    let user 

    try{
        user = retrieveUser(context.userId)

    } catch(error){
        generateToast({
            message: error.message,
            type: errorToast
        })
    }

    function onSidebarSettings(){
        props.onSettingsRow()
    }

    function handleShowHome(){
        props.onHomeRow()
    }

    function handleProfileClick(){
        props.onProfileComponent()
    }

    function refreshUserRender(){
        try{
            user = retrieveUser(context.userId)

        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }

    useEffect(() => {
        console.log('sidebar -> componenteWillReceiveProps')
        refreshUserRender()
    }, [props.lastUserRenderUpdate])

    return <div className="sidebar">
        {console.log('sidebar -> render')}
    <div className="sidebar-logo-and-actions">
        <div className="logo-and-hello">
        <img src="../public/logo.png" className="home-logo"></img>
        <p className="sidebar-logo-text">Helio</p>
        </div>

        <div className="sidebar-actions">

            <div className="sidebar-actions-row sidebar-home" onClick={handleShowHome}>
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">home</span></div><div className="body-text-bold">Home</div>
            </div>

            <div className="sidebar-actions-row">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">search</span></div><div className="body-text-bold">Search</div>
            </div>

            <div className="sidebar-actions-row">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">notifications</span></div><div className="body-text-bold">Notifications</div>
            </div>

            <div className="sidebar-actions-row">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">mail</span></div><div className="body-text-bold">Messages</div>
            </div>

            <div className="sidebar-actions-row sidebar-settings" onClick={onSidebarSettings}>
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">settings</span></div><div className="body-text-bold">Settings</div>
            </div>

        </div>
    </div>

    <div className="sidebar-profile" onClick={handleProfileClick}>
        <div className="sidebar-profile-user-and-avatar">
            <img className="sidebar-avatar" src={user.avatar ? user.avatar : 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='} alt=""/>
            <div className="sidebar-profile-user-data">
                <p className="body-text-bold sidebar-profile-username">{user.username ? user.username : 'username'}</p>
                <p className="small-text sidebar-profile-email">{user.email ? user.email : 'email'}</p>
            </div>
        </div>
    </div>
</div>
}