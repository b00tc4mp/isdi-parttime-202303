import './PostMenu.css'
import DropdownItem from "./DropdownItem"


export default function PostMenu({onToggleHide, onEdit, onDelete, onCloseMenu, privacy}) {
    const handleToggleHide = () => onToggleHide()

    const handleEdit = () => onEdit()

    const handleDelete = () => onDelete()

    const handleCloseMenu = () => onCloseMenu()

    return <>
        <div onClick={handleCloseMenu} className='close-post-menu'/>
        <ul className="post-menu">
            <DropdownItem 
                onClicked={handleToggleHide} 
                dropDownItemClass={'dropdown-item'} 
                icon={`${privacy === 'public'? 'visibility_off' : 'visibility'}`} 
                text={`${privacy === 'public'? 'Hide' : 'Show'}`} 
                textClass={'post-menu-text'}
            />
            <DropdownItem onClicked={handleEdit} dropDownItemClass={'dropdown-item'} icon={'edit'} text={'Edit'} textClass={'post-menu-text'}/>
            <DropdownItem onClicked={handleDelete} dropDownItemClass={'dropdown-item'} icon={'delete'} text={'Delete'} textClass={'post-menu-text'}/>
        </ul>
    </>
}