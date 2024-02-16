import { useAppContext } from "../hooks"

import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button } from '../library'

import {
    retrieveUser,
    isUserLoggedIn,
    updateUserProfile,
    context
} from "../../logic/users"


import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Profile = () => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    console.debug('/// Profile  -> Render')

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    const handleUpdateUserProfile = event => {
        event.preventDefault()

        const userNewEmail = event.target.userNewEmail.value
        const userNewEmailConfirm = event.target.userNewEmailConfirm.value
        console.log(userNewEmail);
        try {
            freeze()
            updateUserProfile(context.token, userNewEmail, userNewEmailConfirm, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })

            alert('Your email has been Successfully updated.')

        } catch (error) {
            alert(error.message)
        }
        unfreeze()
    }

    return (


        <div className='px-3 pt-6'>

            {isUserLoggedIn() ? (
                <div >

                    <h1>Edit Profile</h1>
                    <p className='pb-4'>Keep your personal details private. Information you add here is visible to any who can view your profile.
                    </p>
                    <form action="" onSubmit={handleUpdateUserProfile} >
                        <div div='user-avatar' className="flex flex-col">
                            <label htmlFor="Name" className='grow'>Avatar:</label>
                            <div className='flex flex-row  items-center my-4'>
                                <img className="h-20 w-20  mr-2 rounded-full border-2 hover:border-red border-solid transition duration-150 bg-gray-200 hover:bg-red ease-in-out  motion-reduce:transition-none" />
                                <Button type="submit" className={'max-w-fit place-self-middle'} value="changeAvatar">Change</Button>
                            </div>
                        </ div>
                        <div className='grid gap-2 grid-cols-2 [&>h3]:col-span-2 [&>h3]:mt-4'>
                            <h3 >Name:</h3>
                            <div>

                                <label htmlFor="Name">Edit Name:</label>
                                <input type="text" className=" " name="name" placeholder="Your Name" autoComplete="off" readOnly />
                            </div>
                            <div>

                                <label htmlFor="NickName">Edit nickname:</label>
                                <input type="text" className="" name="nickName" placeholder="New nickname" autoComplete="off" />
                            </div>

                            <h3>Email:</h3>
                            <div>

                                <label htmlFor="userNewEmail">Edit email:</label>
                                <input type="text" className=" " name="userNewEmail" placeholder="userNewEmail@email.com" autoComplete="off" />
                            </div>
                            <div>
                                <label htmlFor="userNewEmailConfirm">Confirm new email:</label>
                                <input type="text" className=" " name="userNewEmailConfirm" placeholder="Confirm New Email" autoComplete="off" />
                            </div>


                            <h3>Password:</h3>
                            <div>

                                <label htmlFor="userCurrentPassword">Current password:</label>
                                <input type="Password" className=" " name="userCurrentPassword" placeholder="current password" autoComplete="off" />
                            </div>
                            <div>
                                <label htmlFor="userNewPassword">New password:</label>
                                <input type="Password" className=" " name="userNewPassword" placeholder="new password" autoComplete="off" />
                                <label htmlFor="userNewPasswordConfirm">Confirm new password:</label>
                                <input type="Password" className=" " name="userNewPasswordConfirm" placeholder="Confirm new password" autoComplete="off" />
                            </div>
                            <div className="text-right col-span-2 mt-4" >
                                <Button type="submit" className={'max-w-fit '}>Save profile</Button>
                            </div>

                        </div>
                    </form>

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
