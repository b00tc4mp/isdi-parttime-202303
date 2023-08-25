
import { Footer, NavBar, BannerAndWelcome, UpdatesHome } from '@/components'
import { fetchUpdates } from '@/utils'

export default async function Home() {
  const updates = await fetchUpdates();
  console.log()
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <BannerAndWelcome />
      <div className="max-w-[1440px] w-full navbar-bg">
          <h1 className="font-bold justify-self-center text-2xl p-4">New Updates</h1>
        </div>
      <div className='max-w-[1440px] w-full flex flex-col sm:flex-row'>
        {
          <UpdatesHome update={updates[0]} />
        }
        {
          <UpdatesHome update={updates[1]} />
        }
        {
          <UpdatesHome update={updates[2]} />
        }
      </div>
      <Footer />
    </div>
  )
}
