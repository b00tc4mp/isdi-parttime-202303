import './Loader.css'
import Container from './Container'
import ModalContainer from './ModalContainer'

export default function Loader() {
  return <ModalContainer className="Loader">
    <Container className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></Container>
  </ModalContainer>
}