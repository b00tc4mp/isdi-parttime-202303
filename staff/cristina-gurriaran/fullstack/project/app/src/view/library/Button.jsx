export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`block w-full rounded-lg bg-indigo-dark px-5 py-3 text-sm font-medium text-white hover:bg-indigo-mid ${className ? className : ''}`}
            {...props}
        >
            {children}
        </button>
    );
}


