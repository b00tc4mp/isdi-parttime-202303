"use client";

import { Footer, NavBar, Messages } from '@/components'
import { useState, useEffect } from 'react'

export default function Home() {

  const [messages, setMessages] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
        fetch('http://localhost:4321/messages/', {
            cache: 'no-store', headers: { Authorization: `Bearer ${sessionStorage.token}` }
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                console.log(messages);
                setLoading(false);
            })
    }
    catch (error: any) {
        alert(error.message);
    }
}, [])
  
if (isLoading) return <p>Loading...</p>
if (!messages) return <p>No messages</p>


  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <div className='max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

        {
          messages?.map((message: any) => (<Messages message={message} />))
        }
      </div>
      <Footer />
    </div>
  )
}
