"use client";

import { SongProps } from "@/types";
import YouTube from "react-youtube";
import { youTubeGetID } from "@/utils";
import { useRouter } from 'next/navigation'
import { deleteSong } from "@/utils";

interface SongProp {
    song: SongProps
}
const Song = ({ song }: SongProp) => {

    const router = useRouter();

    const {_id, title, media, text, date, songInfo } = song;
    const videoID = youTubeGetID(media);
    const dateToDate = new Date(date);
    const dateFormatted = dateToDate.toLocaleString('es-ES');
    async function handleDelete(){
        await deleteSong(_id);
        router.push('/music');
    }

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{title}</h1>
                <div className="flex flex-col xl:grid xl:grid-flow-row xl:grid-cols-2 xl:h-full items-center">
                    <div className="relative w-full h-full grid grid-flow-row grid-cols-1 items-center bg-blue-100">
                        <YouTube videoId={videoID} className="flex flex-row justify-center" />
                    </div>
                    <div className="w-full p-6 justify-center flex flex-col gap-4">
                        <p className="text-justify whitespace-pre-line">{text}</p>
                        <p className="text-justify">{songInfo}</p>
                        <p>{dateFormatted}</p>
                        <div className="flex flex-row gap-3">
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md w-52' onClick={() => router.push('/music/edit/'+_id)}>
                            Edit
                        </button>
                        <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md w-52' onClick={handleDelete}>
                            Delete
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Song;