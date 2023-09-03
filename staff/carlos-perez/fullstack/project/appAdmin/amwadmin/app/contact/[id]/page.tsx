import { Footer, NavBar, Message} from '@/components'
import { fetchMessage } from '@/utils'

export default async function Home({ params }: {params: { id: string }}) {
  const message = await fetchMessage(params.id);
  
  return (
    <div className='grid grid-cols-1 max-w-[1440px] w-full mx-auto justify-center'>
      <NavBar />
      <Message message={message}/>
      <Footer />
    </div>
  )
}