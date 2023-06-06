export default function Form({children, className, ...props}) {
  return <>
    <form className={`flex flex-col gap-2 h-120 p-2 justify-around items-center rounded-lg ${className ? className : ''}`} {...props}>
      {children}
    </form>
  </>
}