
import { Children } from 'react'
import Topbar from '../modules/Topbar'
import './ModalFullScreen.css'

type Props = {
    onClose?: () => void,
    onBack?: () => void,
    children: JSX.Element
}

export default function ModalFullScreen({ onClose, onBack, children }: Props): JSX.Element {
    return <>
        <div className='modal-full-screen-container'>
            <Topbar level='second' secondLevel={{ label: 'Add new product', close: true, onCloseClick: onClose }} />
            <div className='modal-full-screen-content'>
                {children}
            </div>
        </div>
    </>
}