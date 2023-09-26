export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`"block text-md font-bold text-gray-dark ${className ? className : ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
