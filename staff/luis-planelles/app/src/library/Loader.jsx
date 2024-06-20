import Container from './Container'
import './Loader.css'

export default function Loader() {
    return <Container className="modal">
        <Container className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Container>
    </Container>
}