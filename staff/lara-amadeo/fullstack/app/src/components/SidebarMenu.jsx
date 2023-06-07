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

    return <div className="h-screen w-full flex flex-col justify-between border-r border-[--grey-100] px-[16px] box-border">
    <div className="pt-[16px]">
        <div className="flex items-center gap-[8px] pl-[12px]">
        {/*<img src="../public/logo.png" className="w-[40px] h-[40px] m-0 p-[8px]"></img>*/}
        <p className="text-4xl font-semibold text-[--intense-blue] m-0">:-)</p>
        </div>

        <div className="h-fit w-auto flex flex-col items-start gap-[8px] mt-[32px]">

            <div className="flex w-full justify-start items-center gap-[8px] rounded-xl pointer p-[12px] hover:bg-[--violet-100]" onClick={handleShowHome}>
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">home</span></div><div className="body-text-bold">Home</div>
            </div>

            <div className="flex w-full justify-start items-center gap-[8px] rounded-xl pointer p-[12px] hover:bg-[--violet-100]">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">search</span></div><div className="body-text-bold">Search</div>
            </div>

            <div className="flex w-full justify-start items-center gap-[8px] rounded-xl pointer p-[12px] hover:bg-[--violet-100]">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">notifications</span></div><div className="body-text-bold">Notifications</div>
            </div>

            <div className="flex w-full justify-start items-center gap-[8px] rounded-xl pointer p-[12px] hover:bg-[--violet-100]">
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">mail</span></div><div className="body-text-bold">Messages</div>
            </div>

            <div className="flex w-full justify-start items-center gap-[8px] rounded-xl pointer p-[12px] hover:bg-[--violet-100]" onClick={onSidebarSettings}>
                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">settings</span></div><div className="body-text-bold">Settings</div>
            </div>

        </div>
    </div>

    <div className="flex flex-row gap-[16px items-center justify-between] rounded-xl p-[12px] pointer hover:bg-[--violet-100]" onClick={handleProfileClick}>
        {user && <>
            <div className="flex gap-[16px]">
                <img className="w-[40px] h-[40px] rounded-xl object-cover" src={user.avatar ? user.avatar : 'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='} alt=""/>
                <div className="flex flex-col gap-[4px] mr-[40px]">
                    <p className="body-text-bold w-[100px] text-ellipsis truncate whitespace-nowrap">{user.username ? user.username : 'username'}</p>
                    <p className="small-text w-[100px] text-ellipsis truncate whitespace-nowrap">{user.email ? user.email : 'email'}</p>
                </div>
            </div>
        </>
        }
    </div>
</div>
}