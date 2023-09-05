import { Container } from "../library"
import "../styles.css"

export default function Alert({ message, level, onAccept }) {
    console.log('Alert -> render')

    console[level](message)

    let color = 'dodgerblue'

    if (level === 'warn')
        color = 'gold'
    else if (level === 'error')
        color = 'tomato'

    return <Container tag="section" className="modal">
        <p style={{ backgroundColor: color }}>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </Container>
}