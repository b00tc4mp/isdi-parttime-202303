import { updateUserPassword, updateUserAvatar, retrieveUser, retrieveUserPosts, updateUserLocation, updateUserOccupation, updateUserDescription, isCurrentUser, toggleFollowUser, checkFollowingUser, retrieveRequestedUser, retrieveRequestedUserPosts } from "../../logic"
import { Input, Button, Form } from "../library"
import { useAppContext, useHandleErrors } from "../hooks"
import { useEffect, useState } from "react"
import { PostModalWindow } from "."
import { RandomAvatar } from "react-random-avatars"
import { ContextualMenu } from '.'
import { context } from "../../ui"

export default function Profile({ onUpdatedAvatar, handleLogout, page, setPage, setOpenedProfile, handleOpenDeletePost, handleOpenEditPost, handleToggleVisibility, handleLastPostsUpdate, lastPostsUpdate, profileModal, setProfileModal }) {
    const { alert, navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const [postModalWindow, setPostModalWindow] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [settingsMenu, setSettingsMenu] = useState(false)
    const [modal, setModal] = useState(null)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        handleRefreshUser()

        handleRetrievePosts()

        // return () => setPage(page)
    }, [])
    
    useEffect(() => {
        handleRefreshUser()

        handleRetrievePosts()
    }, [lastPostsUpdate, profileModal])

    const handleRefreshUser = () => {
        handleErrors(async () => {
            let _user
            
            if(profileModal === 'currentUser') _user = await retrieveUser()
            else if(profileModal === 'requestedUser') _user = await retrieveRequestedUser(context.requestedUserId)

            setUser(_user)

            console.log('profile -> render')
        })
    }

    const handleRetrievePosts = () => {
        handleErrors(async () => {
            let _posts

            if(profileModal === 'currentUser') _posts = await retrieveUserPosts()
            else if(profileModal === 'requestedUser') _posts = await retrieveRequestedUserPosts(context.requestedUserId)

            setPosts(_posts)
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
        })
    }

    const handleUpdateLocation = event => {
        event.preventDefault()

        const location = event.target.location.value

        handleErrors(async () => {
            await updateUserLocation(location)

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

    const handleTogglePostModalWindow = () => {
        setPostModalWindow(!postModalWindow)

        if(!postModalWindow) handleLastPostsUpdate()
    }

    const toggleEditMode = () => setEditMode(!editMode)

    const toggleSettingsMenu = () => setSettingsMenu(!settingsMenu)

    const handleOpenChangeAvatar = () => {
        toggleSettingsMenu()    
        setModal('changeAvatar')
    }

    const handleOpenChangePassword = () => {
        toggleSettingsMenu()
        setModal('changePassword')
    }

    const handleCloseModal = () => setModal(null)

    const handleToggleFollow = () => {
        handleErrors(async () => {
            await toggleFollowUser(user.id)

            handleRefreshUser()
        })
    }

    const handleShowAvatarProfile = (userId) => {
        handleErrors(async () => {
            let _user
        
            if(isCurrentUser(userId)) {
                _user = await retrieveUser()
            } else {
                _user = await retrieveRequestedUser(userId)
            }

            if(profileModal === 'currentUser') setProfileModal('requestedUser')
            else handleRetrievePosts()
            
            setUser(_user)

            context.requestedUserId = _user.id

            handleCloseModal()
        })
    }

    return <section tag='section' className={`Profile fixed ${profileModal === 'currentUser' ? 'top-24' : 'top-0'} w-full h-screen left-0 z-20 bg-white items-start`}>
        {user && <>
            <div className={`w-full shadow shadow-slate-400 flex items-center gap-1 px-4 ${profileModal === 'requestedUser' ? 'pt-8 h-32' : 'h-24'}`}>
                {profileModal === 'requestedUser' && <div className="absolute top-4 left-2" onClick={handleCloseProfile}><span className="material-symbols-outlined">arrow_back</span></div>}
                {user.avatar
                    ?
                    <img src={user.avatar} alt="avatar" className="h-20 w-20 object-cover rounded-full"/>
                    :
                    <RandomAvatar key={user.name} name={user.name} size={60} />
                }
                <div className="w-full flex flex-col h-full justify-evenly px-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">{user.username}</p>

                        {isCurrentUser(user.id)
                            ?
                            <span className="material-symbols-outlined" onClick={toggleSettingsMenu}>settings</span>
                            :
                            <Button onClick={handleToggleFollow}>{checkFollowingUser(user.followers) ? 'Unfollow' : 'Follow'}</Button>
                        }
                        
                        {settingsMenu && <ContextualMenu
                            classNameContainer='z-10'
                            classNameMenu='top-12'
                            toggleContextualMenu={toggleSettingsMenu}
                            options={[
                                {
                                    text: 'Change avatar',
                                    onClick: () => handleOpenChangeAvatar()
                                },
                                {
                                    text: 'Change password',
                                    onClick: () => handleOpenChangePassword()
                                },
                                {
                                    text: 'Log out',
                                    onClick: () => handleLogout()
                                },
                            ]}
                        />}
                    </div>
                    <div className="flex justify-between">
                        <p>{user.postsNumber} posts</p>
                        <p onClick={() => user.followers.length && setModal('followers')}>{user.followers.length} followers</p>
                        <p onClick={() => user.following.length && setModal('following')}>{user.following.length} following</p>
                    </div>
                </div>
            </div>
            
            <div className={`flex flex-col p-8 gap-2 shadow shadow-slate-400 ${editMode ? 'pt-14' : ''}`}>
                {isCurrentUser(user.id) && <Button className={`absolute right-8 text-sm mt-[-20px] ${editMode ? 'mt-[-44px]' : ''}`} onClick={toggleEditMode}>{!editMode ? 'Edit' : 'Close'}</Button>}

                <p className="font-bold">{user.name}</p>

                <div className="flex items-center"><u>Location</u>: {!editMode
                    ?
                    user.location && user.location
                    :
                    <form className='flex border border-slate-400 rounded-md ml-7 w-full' onSubmit={handleUpdateLocation}>
                        <input className="rounded-md px-2 w-full" name='location' placeholder='Location' defaultValue={user.location && user.location}></input>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</div>
                
                <div className="flex items-center"><u>Occupation</u>: {!editMode
                    ?
                    user.occupation && user.occupation
                    :
                    <form className='flex border border-slate-400 rounded-md ml-2 w-full' onSubmit={handleUpdateOccupation}>
                        <input className="rounded-md px-2 w-full" name='occupation' placeholder='Occupation' defaultValue={user.location && user.occupation}></input>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</div>
                
                <div className="flex items-center"><u>Description</u>: {!editMode
                    ?
                    user.description && user.description
                    :
                    <form className='flex border border-slate-400 rounded-md ml-2 w-full' onSubmit={handleUpdateDescription}>
                        <textarea className="rounded-md px-2 h-20 w-full" name='description' placeholder='Description' defaultValue={user.location && user.description}></textarea>
                        <Button><span className="material-symbols-outlined">send</span></Button>
                    </form>
                }</div>
            </div>

            <div className="p-8">
                <p className="w-full flex justify-center text-2xl mb-4">Posts</p>

                {posts && posts.map((post, index) => <p className="border-t border-slate-300 py-1 text-lg" onClick={handleTogglePostModalWindow} key={index}>- {post.title}</p>)}

                {posts && !posts.length && <p className="w-full flex justify-center p-4 text-xl rounded border border-slate-400">There is no posts available</p>}
            </div>

            {modal === 'changeAvatar' && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 bg-opacity-20 z-10">
                <Form className='w-fit p-10 bg-white' onSubmit={handleChangeAvatar}>
                    <h2 className="font-bold text-lg mb-6">Update avatar</h2>
                    <div className="flex flex-col gap-4">
                        <Input type="url" name="avatarUrl" placeholder="avatar url" />
                        <Input type="password" name="password" placeholder="password" />
                        <div className="flex justify-evenly">
                            <Button>Update</Button>
                            <button  className='bg-gray-50 text-black' type='button' onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </Form>
            </div>}

            {modal === 'changePassword' && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 bg-opacity-20 z-10">
                <Form className='w-fit p-10 bg-white' onSubmit={handleChangePassword}>
                    <h2 className="font-bold text-lg mb-6">Update avatar</h2>
                    <div className="flex flex-col gap-4">
                        <Input type="password" name="password" placeholder="password" />
                        <Input type="password" name="newPassword" placeholder="new password" />
                        <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation" />
                        <div className="flex justify-evenly">
                            <Button>Update</Button>
                            <button className='bg-gray-50 text-black' type='button' onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </Form>
            </div>}

            {modal === 'followers' && <div className="FollowersWindow fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 bg-opacity-20 z-10" onClick={event => {
                if(event.target === document.querySelector('.FollowersWindow')) handleCloseModal()
            }}>
                <div className='w-3/4 p-10 bg-white h-3/5 rounded'>
                    <span className="material-symbols-outlined absolute mt-[-30px] ml-[-25px]" onClick={handleCloseModal}>close</span>
                    <h2 className="font-bold text-xl mb-6 flex justify-center">Followers</h2>
                    {user.followers.map((follower, index) => {
                        return <div key={index} className='flex gap-1 px-1 py-2 w-full border-t border-gray-400' onClick={() => handleShowAvatarProfile(follower.id)}>
                            <div className='mt-3 mr-2'>
                                {follower.avatar
                                    ?
                                    <img src={follower.avatar} alt="follower avatar" />
                                    :
                                    <RandomAvatar name={follower.name} size={30} />
                                }
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold text-lg'>{follower.name}</p>
                                <p>{follower.username}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>}

            {modal === 'following' && <div className="FollowingWindow fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-400 bg-opacity-20 z-10" onClick={event => {
                if(event.target === document.querySelector('.FollowingWindow')) handleCloseModal()
            }}>
                <div className='w-3/4 p-10 bg-white h-3/5 rounded'>
                    <span className="material-symbols-outlined absolute mt-[-30px] ml-[-25px]" onClick={handleCloseModal}>close</span>
                    <h2 className="font-bold text-xl mb-6 flex justify-center">Following</h2>
                    {user.following.map((following, index) => {
                        return <div key={index} className='flex gap-1 px-1 py-2 w-full border-t border-gray-400' onClick={() => handleShowAvatarProfile(following.id)}>
                            <div className='mt-3 mr-2'>
                                {following.avatar
                                    ?
                                    <img src={following.avatar} alt="following avatar" />
                                    :
                                    <RandomAvatar name={following.name} size={30} />
                                }
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold text-lg'>{following.name}</p>
                                <p>{following.username}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>}
        </>}

        {postModalWindow && <PostModalWindow
            handleTogglePostModal={handleTogglePostModalWindow}
            handleOpenDeletePost={handleOpenDeletePost}
            handleOpenEditPost={handleOpenEditPost}
            handleToggleVisibility={handleToggleVisibility}
            handleLastPostsUpdate={handleLastPostsUpdate}
            lastPostsUpdate={lastPostsUpdate}
            page={'profile'}
        />}
    </section>
}
