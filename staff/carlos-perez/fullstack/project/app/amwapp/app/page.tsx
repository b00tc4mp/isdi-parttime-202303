
import { Footer, NavBar, BannerAndWelcome, UpdatesHome } from '@/components'
import { fetchUpdates } from '@/utils'

export default async function Home() {
  const updates = await fetchUpdates();
  const sizedUpdates = [];
  if(updates.length>4){
    for(let i=0; i<4; i++)
    {
      sizedUpdates.push(updates[i]);
    }
    sizedUpdates.reverse();
  }
  else{
    for(let update in updates){
      sizedUpdates.push(updates[update]);
    }
    sizedUpdates.reverse();
  }
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <BannerAndWelcome />
      <div className="max-w-[1440px] w-full navbar-bg">
          <h1 className="font-bold justify-self-center text-2xl p-4">New Updates</h1>
        </div>
      <div className='max-w-[1440px] w-full flex flex-col sm:flex-row'>

        {
          sizedUpdates.map((update) => (<UpdatesHome update={update} />))
        }
      </div>
      <Footer />
    </div>
  )
}
