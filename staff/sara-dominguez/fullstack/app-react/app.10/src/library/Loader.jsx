import './Loader.css'
import Container from './Container.jsx'

export default function Loader() {
    return <Container className="modal">
        <Container className="lds-spinner modal"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Container>
    </Container>
}