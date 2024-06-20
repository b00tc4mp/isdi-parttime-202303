"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'


const Message = (_id: any) => {


    const [message, setMessage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        try {
            fetch('http://localhost:4321/messages/' + _id.id, {
                cache: 'no-store', headers: { Authorization: `Bearer ${sessionStorage.token}` }
            })
                .then((res) => res.json())
                .then((data) => {
                    setMessage(data);
                    console.log(message);
                    setLoading(false);
                })
        }
        catch (error: any) {
            alert(error.message);
        }
    }, [])

    async function handleDelete(){
        try {
            fetch('http://localhost:4321/messages/' + _id.id, {
                method: 'DELETE', headers: { Authorization: `Bearer ${sessionStorage.token}` }
            })
                .then(() => (alert('Message deleted')))
                .then(() =>{router.push('/contact')})
        }
        catch (error: any) {
            alert(error.message);
        }
        
    }



    if (isLoading) return <p>Loading...</p>
    if (!message) return <p>No profile data</p>

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{message.title}</h1>
                <div className="w-full justify-center flex flex-col">
                    <p className="text-justify text-2xl bg-blue-200 text-black h-auto p-4">{message.author}</p>
                    <p className="text-justify text-xl bg-slate-700 text-white h-auto p-4">{message.email}</p>
                    <p className="text-justify whitespace-pre-line text-l bg-blue-50 text-black h-auto p-4 border-2 border-blue-200">{message.text}</p>
                </div>
                <button className='bg-red-300 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' onClick={handleDelete}>
                            Delete
                        </button>
            </div>
        </div>
    )
}

export default Message;