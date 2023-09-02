"use client";

import { Footer, NavBar} from '@/components'
import { returnToken } from '@/utils';


export default function Home() {
  
  const isAuth = returnToken();

  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <p>{`Este es isAuth ${isAuth}`}</p>
      <Footer />
    </div>
  )
}