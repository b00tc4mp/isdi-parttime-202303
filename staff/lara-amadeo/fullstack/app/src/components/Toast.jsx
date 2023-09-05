import './Toast.css'
export default function Toast({ message, type, endAnimation }) {

    const handleRemoveToast = () => {
        endAnimation()
    }

    return <div className="toast-container">
        <p className={`toast ${type === 'error' && 'error-toast'} ${type === 'success' && 'success-toast'} `} onAnimationEnd={handleRemoveToast}>{message}</p>
    </div>
}
