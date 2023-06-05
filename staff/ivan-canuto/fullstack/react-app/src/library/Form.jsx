export default function Form({children, className, ...props}) {
  return <>
    <form className={`flex flex-col gap-2 w-auto p-3 justify-around items-center ${className ? className : ''}`} {...props}>
      {children}
    </form>
  </>
}