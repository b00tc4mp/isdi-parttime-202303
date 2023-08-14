export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className ? className : ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
