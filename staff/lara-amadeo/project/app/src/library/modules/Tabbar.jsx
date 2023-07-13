import { HomeIcon, UserIcon, PlusIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '../icons'
import './Tabbar.css'

export default function Tabbar({ home, search, add, cart, profile }) {

    return <>
        <div className='tabbar-container'>
            <div className='tabbar-item'>
                <HomeIcon className='icon-s grey-700' />
                {home && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item'>
                <MagnifyingGlassIcon className='icon-s grey-700' />
                {search && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item'>
                <PlusIcon className='icon-s grey-700' />
                {add && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item'>
                <ShoppingBagIcon className='icon-s grey-700' />
                {cart && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item'>
                <UserIcon className='icon-s grey-700' />
                {profile && <div className='tabbar-selected'></div>}
            </div>
        </div>

    </>
}