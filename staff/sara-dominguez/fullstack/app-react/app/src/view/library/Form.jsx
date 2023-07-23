export default function Form({ children, className, ...props }) {
    return <form className={`flex flex-col sm:flex-row gap-1 w-[80%] sm:w-[auto] ${className ? className : ''}`}{...props}>
        {children}

    </form>

}