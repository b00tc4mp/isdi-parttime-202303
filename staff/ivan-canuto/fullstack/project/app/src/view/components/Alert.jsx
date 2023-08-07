import ModalContainer from '../library/ModalContainer'

export default function Alert({ error, level, onAccept }) {  
  console.log(error)

  let color = 'lightblue'
  
  if (level === 'warning')
  color = 'yellow'
  else if (level === 'error')
  color ='red'
  
  console.log('Alert -> render')

  return <ModalContainer className='absolute z-50 top-0'>
    <div className="min-w-40 min-h-20 p-4 flex flex-col items-center gap-2 rounded-lg bg-white absolute z-10" >
      <p className="p-2 rounded-md" style={{background: color}}>{error.message}</p>
      <button className="px-2 py-1 hover:bg-gray-300 w-fit rounded-md text-black bg-gray-200" onClick={onAccept}>Accept</button>
    </div>
    <div className='w-full h-full absolute bg-slate-600 opacity-50' onClick={onAccept}></div>
  </ModalContainer>
}