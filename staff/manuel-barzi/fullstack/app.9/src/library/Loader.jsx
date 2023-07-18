import './Loader.css'
import Container from './Container'

export default function Loader() {
    return <Container className="modal">
        <Container className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Container>
    </Container>
}