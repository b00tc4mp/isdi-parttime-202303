import './Alert.css'

export default function Alert({ message, level, onAccept }) {

    console[level](message)

    console.debug('Alert -> render')
    
    if (level === 'warn')
        color = 'gold'
    else if (level === 'error')
        color = 'tomato'

    return <section className="alert-container">
        <div className='alert-message'>
            <p>{message}</p>
            <button className='button' onClick={onAccept}>Accept</button>
        </div>
    </section>
}