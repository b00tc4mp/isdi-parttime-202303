export default function Button({ children, className, ...props }) {
    return <button className={`px-3 py-0 rounded bg-yellow-600 ${className? className: ''}`} {...props}>
        {children}
        
    </button>
}