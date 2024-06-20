import { Footer, NavBar, ContactForm } from '@/components'

export default async function Home() {
  
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <ContactForm/>
      <Footer />
    </div>
  )
}
