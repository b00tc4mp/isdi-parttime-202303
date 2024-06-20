import './ContextualModalBox.css'
import '../style.css'
export default function ContextualModalBox({ options, onAnywhereClick}){

    const handleCloseModal = () => {
        onAnywhereClick()
    }

    return <>
    <div className="fixed top-0 bg-transparent w-full h-screen z-50 flex items-center justify-center" onClick={handleCloseModal} />
    <ul className="bg-[--white] w-[240px] h-fit rounded-xl shadow p-0 absolute z-[100] top-[48px] right-0">
    {options.map(option => <li onClick={option.onClick} className={`small-text-bold list-none py-[8px] px-[16px] border-b border-[--grey-100] last:border-0 text-[--solid-blue] pointer hover:bg-[--violet-100] hover:first:rounded-t-xl hover:last:rounded-b-xl ${option.critical && 'text-[--red-400]'}`}>{option.text}</li>)}
    </ul>
     </>
}