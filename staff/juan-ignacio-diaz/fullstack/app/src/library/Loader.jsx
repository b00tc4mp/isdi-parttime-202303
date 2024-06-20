import Container from '../library/Container'

import './Loader.css'

export default function Loader() {
    console.log('Loader -> render')

    return <Container tab="div" className="modal">
        <Container tab="div" className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Container>
    </Container>
}