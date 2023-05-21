export default function DropdownItem({icon, text}) {
    return(
        <li>
            <span className={`material-symbols-rounded`}>${icon}</span>
            <p>${text}</p>
        </li>
    )
}