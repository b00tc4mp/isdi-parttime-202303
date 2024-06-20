import { Footer, NavBar, Events } from '@/components'
import { fetchEvents } from '@/utils'

export default async function Home() {
  const events = await fetchEvents();
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <div className="max-w-[1440px] w-full navbar-bg">
          <h1 className="font-bold justify-self-center text-2xl p-4">Events</h1>
        </div>
      <div className='max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>

        {
          events.map((evento: any) => (<Events evento={evento} />))
        }
      </div>
      <Footer />
    </div>
  )
}