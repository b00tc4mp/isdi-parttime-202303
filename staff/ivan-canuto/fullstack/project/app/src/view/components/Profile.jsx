import { updateUserPassword, updateUserAvatar, retrieveUser, retrieveUserPosts, updateUserLocation, updateUserOccupation, updateUserDescription } from "../../logic"
import { ModalContainer, Input, Button, Form } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { useEffect, useState } from "react"
import { PostModalWindow } from "."


export default function Profile({ onUpdatedAvatar, handleLogout, page, setPage, setOpenedProfile, handleOpenDeletePost, handleOpenEditPost, handleToggleVisibility, handleLastPostsUpdate, handleTogglePostModal, lastPostsUpdate }) {
    const { alert, navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const [user, setUser] = useState()
    const [insertLocation, setInsertLocation] = useState(false)
    const [insertOccupation, setInsertOccupation] = useState(false)
    const [insertDescription, setInsertDescription] = useState(false)
    const [posts, setPosts] = useState()
    const [postModalWindow, setPostModalWindow] = useState(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        handleRefreshUser()

        handleRetrievePosts()
    }, [])

    const handleRefreshUser = () => {
        handleErrors(async () => {
            const _user = await retrieveUser()

            setUser(_user)

            console.log('profile -> render')
        })
    }

    const handleRetrievePosts = () => {
        handleErrors(async () => {
            setPosts(await retrieveUserPosts())
        })
    }

    const handleCloseProfile = () => {
        console.log(page)
        if (page === 'Home') {
            setPage('Home')
            navigate('/')
        }
        else {
            setPage(`/${page}`)
            navigate(`/${page}`)
        }

        setOpenedProfile(false)
    }

    const handleChangeAvatar = (event) => {
        event.preventDefault()

        const avatarUrl = event.target.avatarUrl.value
        const password = event.target.password.value

        handleErrors(async () => {
            await updateUserAvatar(avatarUrl, password)

            alert({ message: 'Avatar changed successfully.' })

            onUpdatedAvatar()
            handleCloseProfile()
        })
    }

    const handleChangePassword = (event) => {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(password, newPassword, newPasswordConfirm)

            alert({ message: 'Password changed successfully.' })
            handleCloseProfile()
        })
    }

    const handleUpdateLocation = event => {
        event.preventDefault()

        const location = event.target.location.value

        handleErrors(async () => {
            await updateUserLocation(location)

            setEditMode(false)
            handleRefreshUser()
        })
    }

    const handleUpdateOccupation = event => {
        event.preventDefault()

        const occupation = event.target.occupation.value

        handleErrors(async () => {

            await updateUserOccupation(occupation)

            handleRefreshUser()
        })
    }

    const handleUpdateDescription = event => {
        event.preventDefault()

        const description = event.target.description.value

        handleErrors(async () => {
            await updateUserDescription(description)

            handleRefreshUser()
        })
    }

    const handleTogglePostModalWindow = () => setPostModalWindow(!postModalWindow)

    const toggleEditMode = () => setEditMode(!editMode)

    return <section tag='section' className="Profile fixed top-24 w-full h-screen left-0 z-20 bg-white items-start">
        {user && <>
            <div className="w-full h-24 shadow shadow-slate-400 flex items-center gap-4 px-4">
                <img src={user.avatar} alt="avatar" className="h-20 w-20 object-cover rounded-full"/>
                <div className="w-full flex flex-col h-full justify-evenly px-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">{user.username}</p>
                        <Button onClick={handleLogout}>Log out</Button>
                    </div>
                    <div className="flex justify-between">
                        <p>{user.postsNumber} posts</p>
                        <p>{user.followers.length} followers</p>
                        <p>{user.following.length} following</p>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col p-8 gap-2 shadow shadow-slate-400 ${editMode ? 'pt-14' : ''}`}>
                <Button className={`absolute right-8 text-sm mt-[-20px] ${editMode ? 'mt-[-44px]' : ''}`} onClick={toggleEditMode}>{!editMode ? 'Edit' : 'Close'}</Button>
                {/* <p className="flex items-center gap-2">{(user.location && editMode) && <span className="material-symbols-outlined cursor-pointer font-black rounded-full ml-[-20px]" onClick={onInsertLocation}>edit</span>}<u> Location:</u> {!insertLocation
                ?
                    user.location ? user.location : <Button className='w-fit h-fit' onClick={onInsertLocation}>{<p className="text-sm">Add</p>}</Button>
                :
                    editMode && <form className='flex border border-slate-400 rounded-md' onSubmit={handleUpdateLocation}>
                        <input className="rounded-md px-2" name='location' placeholder='Location'></input>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                        <Button type='button' onClick={() => setInsertLocation(false)}><span className="material-symbols-outlined">close</span></Button>
                    </form>}</p> */}

                <p className="flex items-center"><u>Location</u>: {!editMode
                    ?
                    user.location && user.location
                    :
                    <form className='flex border border-slate-400 rounded-md ml-7 w-full' onSubmit={handleUpdateLocation}>
                        <input className="rounded-md px-2 w-full" name='location' placeholder='Location' defaultValue={user.location && user.location}></input>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</p>
                
                <p className="flex items-center"><u>Occupation</u>: {!editMode
                    ?
                    user.occupation && user.occupation
                    :
                    <form className='flex border border-slate-400 rounded-md ml-2 w-full' onSubmit={handleUpdateOccupation}>
                        <input className="rounded-md px-2 w-full" name='occupation' placeholder='Occupation' defaultValue={user.location && user.occupation}></input>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</p>
                
                <p className="flex items-center"><u>Description</u>: {!editMode
                    ?
                    user.description && user.description
                    :
                    <form className='flex border border-slate-400 rounded-md ml-2 w-full' onSubmit={handleUpdateDescription}>
                        <textarea className="rounded-md px-2 h-20 w-full" name='description' placeholder='Description' defaultValue={user.location && user.description}></textarea>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</p>

                {/* <p className="flex items-center gap-2">{(user.occupation && editMode) && <span className="material-symbols-outlined cursor-pointer font-black rounded-full ml-[-20px]" onClick={onInsertOccupation}>edit</span>}<u>Occupation:</u> 
                {!insertOccupation
                ?
                user.occupation ? user.occupation : <Button className='w-fit h-fit' onClick={onInsertOccupation}>{<p className="text-sm">Add</p>}</Button>
                :
                <form className='flex border border-slate-400 rounded-md' onSubmit={handleUpdateOccupation}>
                    <input className="rounded-md px-2" name='occupation' placeholder='Occupation'></input>
                    <Button><span className="material-symbols-outlined">send</span></Button>
                    <Button type='button' onClick={() => setInsertOccupation(false)}><span className="material-symbols-outlined">close</span></Button>
                </form>}</p> */}

                {/* <p className="flex gap-2">{(user.description && editMode) && <span className="material-symbols-outlined cursor-pointer font-black rounded-full ml-[-20px]" onClick={onInsertDescription}>edit</span>}<u>Description:</u> {!insertDescription
                ?
                user.description ? user.description : <Button className='w-fit h-fit' onClick={onInsertDescription}>{<p className="text-sm">Add</p>}</Button>
                :
                <AddDescription
                    onCloseModal={onCloseModal}
                    handleRefreshUser={handleRefreshUser}
                />}</p> */}
            </div>
            <div className="p-8">
                <p className="w-full flex justify-center text-xl mb-4">Posts</p>
                {posts && posts.forEach(() => <p onClick={handleTogglePostModalWindow}>- {posts.title}</p>)}
                {posts && !posts.length && <p className="w-full flex justify-center p-4 text-xl rounded border border-slate-400">There is no posts available</p>}
            </div>
        </>}
        {postModalWindow && <PostModalWindow
            handleTogglePostModal={handleTogglePostModalWindow}
            handleOpenDeletePost={handleOpenDeletePost}
            handleOpenEditPost={handleOpenEditPost}
            handleToggleVisibility={handleToggleVisibility}
            handleLastPostsUpdate={handleLastPostsUpdate}
            lastPostsUpdate={lastPostsUpdate}
        />}
            {/* <div className="flex flex-col items-center gap-4 overflow-scroll">
                <div className="w-48 flex justify-center">
                    {user && <h1 className="text-2xl border-b-2 border-black w-fit font-mono p-1">{user.name}</h1>}
                </div>
                <Button className='w-1/2 bg-white border border-slate-300' onClick={handleLogout}>Log out</Button>
                <Form className='bg-transparent wx-44 sm:w-96' onSubmit={handleChangeAvatar}>
                    <h2 className="font-bold">Update avatar</h2>
                    <div className="flex flex-col gap-2">
                        <Input type="url" name="avatarUrl" placeholder="avatar url" />
                        <Input type="password" name="password" placeholder="password" />
                        <Button>Update</Button>
                    </div>
                </Form>
                <Form className='bg-transparent wx-44 sm:w-96' onSubmit={handleChangePassword}>
                    <h2 className="font-bold">Update password</h2>
                    <div className="flex flex-col gap-2">
                        <Input type="password" name="password" placeholder="password" />
                        <Input type="password" name="newPassword" placeholder="new password" />
                        <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
                        <Button>Update</Button>
                    </div>
                </Form>
            </div>
            <Button className="bg-red-200 absolute top-28 left-4 z-20" onClick={handleCloseProfile}>Close</Button>
        <div className="w-full h-full absolute top-0 z-10 bg-slate-100"></div> */}


        
    </section>
}
