export default function FormButton({ children, className, ...props }) {
    return <button className={`flex w-5/12 justify-center rounded-md bg-amber-500 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 drop-shadow-md text-center ${className ? className : ''}`} {...props}>
        {children}

    </button>
}