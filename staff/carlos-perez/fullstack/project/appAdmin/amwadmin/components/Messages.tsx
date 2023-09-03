"use client";

import { MessageProps } from "@/types";
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface MessagesProps {
    message: MessageProps;
}
const Messages = ({ message }: MessagesProps) => {

    const { _id, title, author } = message;

    const router = useRouter()

    const enroute = (route: string) => {
        router.push(route);
    }

    const [clickedButton, setClickedButton] = useState('');

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        setClickedButton(button.name);
        enroute(`/contact/${button.name}`);
    };

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            <div className="flex flex-col justify-between content-center border-solid border-2 border-blue-100 cursor-pointer">
                <button onClick={buttonHandler} name={_id}>
                <h1 className="font-bold justify-self-center text-xl p-4">{title}</h1>
                <h1 className="font-bold justify-self-center text-xl p-4">{author}</h1>
                </button>
            </div>
        </div>
    )
}

export default Messages;