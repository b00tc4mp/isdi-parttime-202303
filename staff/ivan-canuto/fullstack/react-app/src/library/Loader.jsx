import './Loader.css'
import ModalContainer from './ModalContainer'

export default function Loader() {
  return <ModalContainer>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </ModalContainer>
}