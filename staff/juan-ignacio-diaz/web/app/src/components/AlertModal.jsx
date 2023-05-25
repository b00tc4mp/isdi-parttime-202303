import './AlertModal.css'

export default function AlertModal ({ onAccept, message }) {
    function handleAccepAlert(event) {
        event.preventDefault()

        onAccept()
    }
    
    return <>
        <div className = "modal container">
            <div className = "msAlert container">
                <p>{message}</p>
                <button className = "button" name = "accept" onClick={handleAccepAlert}>Accept</button>
            </div>
        </div>
    </>
}