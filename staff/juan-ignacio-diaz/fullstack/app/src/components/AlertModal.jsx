import Container from '../library/Container'

import './AlertModal.css'

export default function AlertModal ({ onAccept, message }) {
    function handleAccepAlert(event) {
        event.preventDefault()

        onAccept()
    }
    
    return <>
        <Container tag="div" className = "modal">
            <Container tag="div" className = "msAlert">
                <p>{message}</p>
                <button className = "button" name = "accept" onClick={handleAccepAlert}>Accept</button>
            </Container>
        </Container>
    </>
}