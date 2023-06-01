import './ContextualModalBox.css'
import '../style.css'
export default function ContextualModalBox({ options, onAnywhereClick}){

    const handleCloseModal = () => {
        onAnywhereClick()
    }

    return <>
    <div className="modal-overlay-transparent" onClick={handleCloseModal} />
    <ul className="contextual-modal-box-container">
    {options.map(option => <li onClick={option.onClick} className={`small-text-bold option pointer ${option.critical && 'critical'}`}>{option.text}</li>)}
    </ul>
     </>
}