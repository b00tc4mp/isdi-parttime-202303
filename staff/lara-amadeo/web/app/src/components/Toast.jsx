import './Toast.css'
export default function Toast({ message, type, duration ,endAnimation }){

    const handleRemoveToast = () => {
        endAnimation()
    }

    return <div className="toast-container">
        <p className={`toast ${type === 'error' ? 'error-toast' : 'sucess-toast'}`} style={animationDuration={duration}} onAnimationEnd={handleRemoveToast}>{message}</p>
    </div>
}

// style={[{backgroundColor:{type}}, {animationDuration:{length}}]}