import { useState } from 'react';
import avatars from '../assets/avatars';
import inLogger from '../inLogger';


const UserCard = ({ userInfo }) => {

    return (
        <div className="w-full md:w-5/12 lg:w-4/12 p-4 border border-light400 bg-light500 rounded-lg shadow flex flex-row gap-2 md:flex-row-reverse justify-around">
            <div className="flex items-start flex-col">
                <h3 className={`mb-2 text-2xl text-${userInfo.color} font-semibold self-center`}>{userInfo.username}</h3>
                <p className="flex flex-col gap-2 text-sm font-semibold">
                    <span className="font-serif text-xs text-secondary100">- rider since {new Date(userInfo.joined).toLocaleDateString("en-GB")} -</span>
                    <span className="text-light100 flex flex-row gap-2">followers: 42
                        <button
                            className="w-fit py-1 px-2 bg-success200 hover:bg-dark500 text-xs text-light400 font-bold rounded-xl transition duration-200"
                        >
                            Follow
                        </button>
                    </span>
                </p>
            </div>
            <div className="flex flex-col justify-center align-center h-full py-4 md:py-0">
                <img className={`bg-${userInfo.color} w-16 w-16 md:w-18 md:h-18 rounded-full self-center`} src={`${avatars[userInfo.avatar]}`} alt="avatar" />
            </div>
        </div>
    )
}


export default inLogger(UserCard);