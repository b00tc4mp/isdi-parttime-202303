
export default function Alert({ message, level, onAccept }) {
    console.debug('Alert -> render')

    // console[level](message)

    let color = 'dodgerblue'
    
    if (level === 'warn')
        color = 'gold'
    else if (level === 'error')
        color = 'tomato'

    return <section className="alert-container">
        <div className='alert-message'>
            <p style={{ backgroundColor: color }}>{message}</p>
            <button className='button' onClick={onAccept}>Accept</button>
        </div>
    </section>
}