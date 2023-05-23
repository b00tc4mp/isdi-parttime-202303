import './Alert.css'

export default function Alert ({ message, level, onAccept }) {
  return (
    <div className='modal'>
      <p className='alert'>{message}
        <button className={`button ${level === 'error' ? 'error' : 'warn'}`} type='button' onClick={onAccept}>ACCEPT</button>
      </p>
    </div>
  )
}
