import Image from 'next/image'
import { Footer, NavBar, BannerAndWelcome, UpdatesHome } from '@/components'

export default function Home() {
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <BannerAndWelcome/>
      <UpdatesHome/>
      <Footer />
    </div>
  )
}
