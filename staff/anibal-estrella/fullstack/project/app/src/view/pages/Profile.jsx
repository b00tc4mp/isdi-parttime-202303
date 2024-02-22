import { useAppContext } from "../hooks"

import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '../library'

import {
    retrieveUser,
    isUserLoggedIn,
    updateUserProfile,
    loginUser,
    context
} from "../../logic/users"

const Profile = () => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    console.debug('/// Profile  -> Render')

    const [user, setUser] = useState({
        name: '',
        nickName: '',
        email: '',
        userNewEmail: '',
        userNewEmailConfirm: '',
        userCurrentPassword: '',
        userNewPassword: '',
        userNewPasswordConfirm: ''
    })

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    useEffect(() => {
        try {
            retrieveUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleLogin = async event => {
        event.preventDefault();
        const password = event.target.password.value;

        try {
            freeze();
            await loginUser(email, password);
        } catch (error) {
            unfreeze();
            alert(error.message, 'error');
        } finally {
            unfreeze();
        }
    }

    const handleUpdateUserProfile = event => {
        event.preventDefault()
        const userNewName = event.target.name.value
        const userNewNickName = event.target.nickName.value
        const userNewEmail = event.target.email.value
        const userNewEmailConfirm = event.target.userNewEmailConfirm.value

        try {
            freeze()
            updateUserProfile(context.token, userNewName, userNewNickName, userNewEmail, userNewEmailConfirm, password, userNewPassword, error => {
                if (error) {
                    alert(error.message)
                    return
                }
            })
            alert('Your profile has been Successfully updated.')

        } catch (error) {
            alert(error.message)
        }
        unfreeze()
    }

    const handleCancel = () => {
        console.log('CANCEL!!');
    }

    const [avatar, setAvatar] = useState(user.avatar);

    const handleAvatarChange = (event) => {
        console.log('AVATAAARRR!');
        const files = event.target.files;
        if (files.length > 0) { // Check if files array is not empty
            const file = files[0]; // Get the first file from the input
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the avatar state to the base64 data URL of the selected image
                setUser({ ...user, avatar: reader.result });
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        }
    }

    return (
        <div className='px-3 pt-6'>

            {isUserLoggedIn() ? (
                <div >
                    {user &&
                        <div>
                            <h2>{user.name}, Edit your profile</h2>
                            <p>{user.email}</p>
                        </div>
                    }
                    <p className='pb-4'>Keep your personal details private. Information you add here is visible to any who can view your profile.
                    </p>
                    {user &&
                        <form action="" onSubmit={handleUpdateUserProfile} >
                            <div div='user-avatar' className="flex flex-col">
                                <p className='grow'>Avatar:</p>
                                <div className='flex flex-row  items-center my-4'>
                                    <img className="h-20 w-20  mr-2 rounded-full border-2 hover:border-red border-solid transition duration-150 bg-gray-200 hover:bg-red ease-in-out  motion-reduce:transition-none" src={user.avatar} alt={user.avatar} />


                                    <label htmlFor='avatar'>
                                        <Button type="button" className={'max-w-fit place-self-middle'}>Change</Button>
                                        <input
                                            type='file'
                                            id='avatar'
                                            accept='image/*'
                                            onChange={handleAvatarChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>


                                </div>
                            </ div>
                            <div className='grid gap-2 grid-cols-2 [&>h3]:col-span-2 [&>h3]:mt-4'>
                                <h3 >Name:</h3>
                                <div>
                                    <label htmlFor="Name">Edit Name:</label>
                                    <input type="text"
                                        name="name"
                                        placeholder="Your Name" autoComplete="off"
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>

                                    <label htmlFor="nickName">Edit nickname:</label>
                                    <input type="text"
                                        name="nickName"
                                        placeholder="New nickname"
                                        value={user.nickName}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                </div>

                                <h3>Email:</h3>
                                <div>

                                    <label htmlFor="email">Edit email:</label>
                                    <input type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={user.email}
                                        onChange={handleChange}
                                        autoComplete="enter email"
                                        autoFocus
                                    />

                                </div>
                                <div>
                                    <label htmlFor="userNewEmailConfirm">Confirm new email:</label>
                                    <input
                                        type="text"
                                        name="userNewEmailConfirm"
                                        placeholder="Confirm New Email"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>


                                <h3>Password:</h3>
                                <div>

                                    <label htmlFor="userCurrentPassword">Current password:</label>
                                    <input
                                        type="Password"
                                        name="userCurrentPassword"
                                        placeholder="current password"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <label htmlFor="userNewPassword">New password:</label>
                                    <input type="Password"
                                        name="userNewPassword" placeholder="new password"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />

                                    <label htmlFor="userNewPasswordConfirm">Confirm new password:</label>
                                    <input type="Password"
                                        name="userNewPasswordConfirm" placeholder="Confirm new password"
                                        onChange={handleChange}
                                        autoComplete="off" />
                                </div>
                                <Button type="button" className={'button-cancel max-w-fit hover:button-cancel-hover'} onClick={handleCancel}>Cancel</Button>
                                <Button type="submit" className={'max-w-fit '}>Save profile</Button>

                            </div>
                        </form>
                    }

                </div>
            ) : (
                <div>
                    <h3>User must be logged</h3>
                </div>
            )}

            {/* // {error && <p className=" bg-lime-200">{error}</p>} */}

        </div>



    );
};


export default Profile;
