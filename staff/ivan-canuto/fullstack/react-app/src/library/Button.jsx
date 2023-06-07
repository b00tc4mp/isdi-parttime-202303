export default function Button({children, className, ...props}) {
  return <>
    <button className={`py-2 px-2 rounded-lg bg-gray-300 text-black border-none hover:bg-gray-400 flex justify-center items-center ${className ? className : ''}`} {...props}>{children}</button>
  </>
}