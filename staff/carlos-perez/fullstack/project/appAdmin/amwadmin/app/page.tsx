import { Footer, NavBar, Login } from '@/components'

export default function Home() {

  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <Login />
      <Footer />
    </div>
  )
}
