import { Footer, NavBar, Songs } from '@/components'
import { fetchSongs } from '@/utils'

export default async function Home() {
  const songs = await fetchSongs();
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <div className="max-w-[1440px] w-full navbar-bg">
          <h1 className="font-bold justify-self-center text-2xl p-4">Songs</h1>
        </div>
      <div className='max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

        {
          songs.map((song: any) => (<Songs song={song} />))
        }
      </div>
      <Footer />
    </div>
  )
}
