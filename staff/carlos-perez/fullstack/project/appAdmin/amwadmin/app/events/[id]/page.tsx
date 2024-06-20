import { Footer, NavBar, Event} from '@/components'
import { fetchEvent } from '@/utils'

export default async function Home({ params }: {params: { id: string }}) {
  const evento = await fetchEvent(params.id);
  
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <Event evento={evento}/>
      <Footer />
    </div>
  )
}