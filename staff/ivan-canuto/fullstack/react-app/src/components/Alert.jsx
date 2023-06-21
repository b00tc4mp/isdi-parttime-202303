import ModalContainer from '../library/ModalContainer'

export default function Alert({ message, level, onAccept }) {
  
  // console[level](message)
  console.debug(message)

  let color = 'blue'
  
  if (level === 'warning')
  color = 'yellow'
  else if (level === 'error')
  color ='red'
  
  console.debug('Alert -> render')

  return <ModalContainer className='z-500'>
    <div className="min-w-40 min-h-20 p-4 flex flex-col items-center gap-2 rounded-lg bg-white">
      <p className="p-2 rounded-md" style={{background: color}}>{message}</p>
      <button className="px-2 py-1 hover:bg-gray-300 w-fit rounded-md text-black bg-gray-200" onClick={onAccept}>Accept</button>
    </div>
  </ModalContainer>
}