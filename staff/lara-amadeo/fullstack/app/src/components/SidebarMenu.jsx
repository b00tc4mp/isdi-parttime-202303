import { useEffect } from "react"
import retrieveUser from "../logic/retrieveUser"
import { context } from "../ui"
import './SidebarMenu.css'
import { useState } from "react"
import { useContext } from "react"
import Context from "../Context"

export default function SidebarMenu({ onSettingsRow, onHomeRow, onProfileComponent, lastUserRenderUpdate }){

    const { generateToast } = useContext(Context)

    const [user, setUser] = useState()

    useEffect(()=> {
        refreshUserRender()
    },[])

    function onSidebarSettings(){
        onSettingsRow()
    }

    function handleShowHome(){
       onHomeRow()
    }

    function handleProfileClick(){
        onProfileComponent()
    }

    function refreshUserRender(){
        try{
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    generateToast(error.message,'error')
                    
                    return
                }
                setUser(user)
            })
        } catch(error){
            generateToast(error.message,'error')
        }
    }

    useEffect(() => {
        refreshUserRender()
    }, [lastUserRenderUpdate])

    return <div className="sidebar">
    <div className="sidebar-logo-and-actions">
        <div className="logo-and-hello">
        {/*<img src="../public/logo.png" className="home-logo"></img>*/}
        <p className="sidebar-logo-text">:-)</p>
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
        {user && <>
            <div className="sidebar-profile-user-and-avatar">
                <img className="sidebar-avatar" src={user.avatar ? user.avatar : 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='} alt=""/>
                <div className="sidebar-profile-user-data">
                    <p className="body-text-bold sidebar-profile-username">{user.username ? user.username : 'username'}</p>
                    <p className="small-text sidebar-profile-email">{user.email ? user.email : 'email'}</p>
                </div>
            </div>
        </>
        }
    </div>
</div>
}