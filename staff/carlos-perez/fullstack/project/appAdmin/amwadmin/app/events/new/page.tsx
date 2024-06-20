"use client";

import { Footer, NavBar, NewEventForm} from '@/components'


export default function Home() {
  

  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <NewEventForm />
      <Footer />
    </div>
  )
}