//lo importaré en el compo padre más alto, en este caso en APP que engloba Register, Login y Home
import Container from '../library/Container.jsx'

export default function Alert({ message, level, onAccept }) {
    console.debug('Alert => render ')

    console[level][message]

    let color = 'blue'

    if (level === 'warn') {
        color = 'red'
    } else if (level === 'error') {
        color = 'yellow'
    }

    return <Container tag="section" className="modal container">
        <p style={{ backgrounColor: color }}>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </Container>

}



