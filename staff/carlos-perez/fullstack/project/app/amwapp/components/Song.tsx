"use client";

import { SongProps } from "@/types";
import YouTube from "react-youtube";
import { youTubeGetID } from "@/utils";

interface SongProp
{
    song: SongProps
}
const Song = ({ song }: SongProp) => {

    const { title, media, text, date, songInfo } = song;
    const videoID=youTubeGetID(media);
    const dateToDate= new Date(date);
    const dateFormatted = dateToDate.toLocaleString('es-ES');

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{title}</h1>
                <div className="flex flex-col xl:grid xl:grid-flow-row xl:grid-cols-2 xl:h-full items-center">
                    <div className="relative w-full h-full items-center bg-blue-100">
                    <YouTube videoId={videoID} className="flex flex-row justify-center"/>
                    </div>
                    <div className="w-full p-6 justify-center flex flex-col gap-4">
                        <p className="text-justify">{text}</p>
                        <p className="text-justify">{songInfo}</p>
                        <p>{dateFormatted}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Song;