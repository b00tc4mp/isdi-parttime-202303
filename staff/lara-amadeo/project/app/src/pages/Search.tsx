import './Search.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Header from '../library/components/Header'
import FakeSearchBar from '../library/components/FakeSearchBar'
import TextField from '../library/components/TextField'
import { MagnifyingGlassIcon } from '../library/icons'
import SearchBar from '../library/components/SearchBar'


export default function Search() {
    return <>
        <Topbar level={'first'} />
        <div className="page-first-level">
            <Header text={'Search'} />
            <SearchBar />
        </div>
        <Tabbar search={true} />
    </>
}