"use client";

import { Footer, NavBar, HomeButtons } from '@/components'
import { returnToken } from '@/utils';


export default function Home() {
  

  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <HomeButtons/>
      <Footer />
    </div>
  )
}