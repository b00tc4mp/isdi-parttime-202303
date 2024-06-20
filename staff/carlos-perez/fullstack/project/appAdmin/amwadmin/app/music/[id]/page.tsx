import { Footer, NavBar, Song} from '@/components'
import { fetchSong } from '@/utils'

export default async function Home({ params }: {params: { id: string }}) {
  const song = await fetchSong(params.id);
  
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <Song song={song}/>
      <Footer />
    </div>
  )
}