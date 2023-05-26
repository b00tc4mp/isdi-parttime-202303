import './DropdownItem.css'

export default function DropdownItem({icon, text, iconClass, textClass, dropDownItemClass, onClicked}) {
    const handleClick = () => onClicked()
    
    return(
        <li onClick={handleClick} className={`${dropDownItemClass}`}>
            <span className={`material-symbols-rounded ${iconClass}`}>{icon}</span>
            <p className={`${textClass}`}>{text}</p>
        </li>
    )
}