const Form = ({children, ...props}) => {
    return <form className="flex flex-col md:flex-row gap-2 w-full sm:w-auto" {...props}>
        {children}
    </form>
}

export default Form