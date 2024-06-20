"use client";
import { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const EditSongForm = (_id: any) => {
    console.log(_id.id);

    const [song, setSong] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://localhost:4321/lyricPosts/' + _id.id, { cache: 'no-store' })
                .then((res) => res.json())
                .then((data) => {
                    setSong(data);
                    setLoading(false);
                })
        }
        catch (error: any) {
            alert(error.message);
        }
    }, [])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            title: { value: string }
            media: { value: string }
            text: { value: string }
            songInfo: { value: string }
        }


        const title = target.title.value;
        const media = target.media.value;
        const text = target.text.value;
        const songInfo = target.songInfo.value;


        const url = 'http://localhost:4321/lyricPosts/' + _id.id
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`
            },
            body: JSON.stringify({
                title: title,
                media: media,
                text: text,
                songInfo: songInfo,
                visibility: true
            })
        })

        if (res.status === 201) {
            alert('Song updated')
        }
        else {
            alert('Something went wrong. Please, try again');
        }
    }

    function handleCancel() {
        router.push('/music')
    }

    if (isLoading) return <p>Loading...</p>
    if (!song) return <p>No profile data</p>

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">Edit</h1>
                <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52 justify-self-center' onClick={handleCancel}>Cancel</button>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                <form className='flex flex-col gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 title' id='title' type='text' aria-label='title' placeholder='Title' defaultValue={song.title}/>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 media' id='media' type='text' aria-label='media' placeholder='YouTube Video URL' defaultValue={song.media} />
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 text' id='text' aria-label='text' placeholder='Text' defaultValue={song.text} />
                        <textarea className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 songInfo' id='songInfo' aria-label='songInfo' placeholder='Song Information' defaultValue={song.songInfo} />
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditSongForm;
