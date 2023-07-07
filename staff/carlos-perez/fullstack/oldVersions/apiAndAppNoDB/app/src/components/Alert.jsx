export default function Alert({ message, level, onAccept }) {

    console[level](message)

    console.debug('Alert -> render')
    
    let color = 'dodgerblue'

    if (level === 'warn')
        color = 'gold'
    else if (level === 'error')
        color = 'tomato'

    return <section className="modal container">
        <p style={{backgroundColor: color}}>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </section>
}