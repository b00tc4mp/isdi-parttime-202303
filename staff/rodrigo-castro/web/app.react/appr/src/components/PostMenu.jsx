import './PostMenu.css'
import DropdownItem from "./DropdownItem"


export default function PostMenu({options, onCloseMenu}) {
    const handleCloseMenu = () => onCloseMenu()

    return <>
        <div onClick={handleCloseMenu} className='close-post-menu'/>
        <ul className="post-menu">

            {options.map(option => <DropdownItem onClick={option.onClick} dropDownItemClass={option.dropDownItemClass} icon={option.icon} text={option.text} textClass={option.textClass}/>)}

        </ul>
    </>
}