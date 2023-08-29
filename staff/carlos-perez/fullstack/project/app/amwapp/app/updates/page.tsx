import { Footer, NavBar, UpdatesHome } from '@/components'
import { fetchUpdates } from '@/utils'

export default async function Home() {
  const updates = await fetchUpdates();
  updates.reverse();
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <div className="max-w-[1440px] w-full navbar-bg">
          <h1 className="font-bold justify-self-center text-2xl p-4">New Updates</h1>
        </div>
      <div className='max-w-[1440px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>

        {
          updates?.map((update: any) => (<UpdatesHome update={update} />))
        }
      </div>
      <Footer />
    </div>
  )
}
