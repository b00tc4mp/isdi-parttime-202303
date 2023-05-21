import DropdownItem from "./DropdownItem";


export default function PostMenu() {

    return <>
        <div>
            <ul>
                <DropdownItem icon={'visibility'} text={'Show/Hide'}/>
                <DropdownItem icon={'edit'} text={'Edit'}/>
                <DropdownItem icon={'delete'} text={'Delete'}/>
            </ul>
        </div>
    </>
}