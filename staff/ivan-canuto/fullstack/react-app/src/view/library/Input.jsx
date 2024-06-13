export default function Input({className, type, ...props}) {
  return <>
    <input className={`border-2 p-2 rounded-lg w-full text-black ${className ? className : ''}`} type={type} {...props}></input>
  </>
}