import Image from 'next/image'
import { Footer, NavBar } from '@/components'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className='h-96'></div>
      <Footer/>
    </div>
  )
}
