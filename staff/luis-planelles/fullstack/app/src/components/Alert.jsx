import Container from "../library/Container"

const Alert = ({ message, level, onAccept }) => {
    console[level](message)

    console.debug('Alert -> render')
    
    let color = 'dodgerblue'

    if (level === 'warn')
        color = 'gold'
    else if (level === 'error')
        color = 'tomato'

    return <Container tag="section" className="modal">
        <p style={{backgroundColor: color}}>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </Container>
}

export default Alert