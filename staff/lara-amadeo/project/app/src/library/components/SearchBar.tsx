import { MagnifyingGlassIcon } from '../icons'
import './SearchBar.css'

type Props = {
    onBarClick?: () => void
}

export default function SearchBar({ onBarClick }: Props): JSX.Element {

    return <>
        <div className='searchBar-container'>
            <input className='searchBar-input'></input>
            <MagnifyingGlassIcon className='icon-s grey-400 searchBar-icon' />
        </div>
    </>
}