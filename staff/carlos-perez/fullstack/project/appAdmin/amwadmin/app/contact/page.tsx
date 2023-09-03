"use client";

import { Footer, NavBar, Messages } from '@/components'
import { fetchMessages } from '@/utils';

export default async function Home() {
  
  const messages = await fetchMessages();

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
