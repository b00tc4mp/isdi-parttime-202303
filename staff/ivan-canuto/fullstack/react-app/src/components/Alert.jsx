import ModalContainer from '../library/ModalContainer'
import './components-styles/Alert.css'

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
    <div className="alert-modal">
      <p className="alert-message" style={{background: color}}>{message}</p>
      <button className="accept-alert-button" onClick={onAccept}>Accept</button>
    </div>
  </ModalContainer>
}