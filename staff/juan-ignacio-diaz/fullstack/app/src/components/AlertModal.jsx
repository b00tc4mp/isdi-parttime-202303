import { Container, Button } from '../library'

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
                <Button className = "button" name = "accept" onClick={handleAccepAlert}>Accept</Button>
            </Container>
        </Container>
    </>
}