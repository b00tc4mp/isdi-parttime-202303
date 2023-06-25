export default function Form({ children, ...props }) {
    return <form className="flex flex-col justify-center items-center gap-5 w-full h-[250px]" {...props}>
        {children}
    </form>
}