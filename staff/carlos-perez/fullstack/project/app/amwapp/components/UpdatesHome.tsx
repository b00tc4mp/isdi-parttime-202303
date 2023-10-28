"use client";

import { UpdateProps } from "@/types";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface UpdatesHomeProps {
    update: UpdateProps;
}
const UpdatesHome = ({ update }: UpdatesHomeProps) => {

    const { _id, title, image } = update;

    const router = useRouter()

    const enroute = (route: string) => {
        router.push(route);
    }

    const [clickedButton, setClickedButton] = useState('');

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const button: HTMLButtonElement = event.currentTarget;
        setClickedButton(button.name);
        enroute(`/updates/${button.name}`);
    };

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            <div className="flex flex-col justify-between content-center border-solid border-2 border-blue-100 cursor-pointer">
                <button onClick={buttonHandler} name={_id}>
                <h1 className="font-bold justify-self-center text-xl p-4">{title}</h1>
                <div className="relative w-full h-60 sm:h-80 object-contain">
                    <Image
                        src={image}
                        alt='update image'
                        fill
                        priority
                        className='object-cover'
                    />
                </div>
                </button>
            </div>
        </div>
    )
}

export default UpdatesHome;