import { useContext } from 'react'
import { HomeIcon, UserIcon, PlusIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '../icons'
import './Tabbar.css'
import Context from '../../Context'

type Props = {
    home?: boolean,
    search?: boolean,
    add?: boolean,
    cart?: boolean,
    profile?: boolean
}

export default function Tabbar({ home, search, add, cart, profile }: Props): JSX.Element {

    const { loaderOn, LoaderOff, navigate } = useContext(Context)

    const openAddMealModal = () => {
        navigate('/addMeal')
    }

    const onProfile = () => {
        navigate('/profile')
    }


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
            <div className='tabbar-item' onClick={openAddMealModal}>
                <PlusIcon className='icon-s grey-700' />
                {add && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item'>
                <ShoppingBagIcon className='icon-s grey-700' />
                {cart && <div className='tabbar-selected'></div>}
            </div>
            <div className='tabbar-item' onClick={onProfile}>
                <UserIcon className='icon-s grey-700' />
                {profile && <div className='tabbar-selected'></div>}
            </div>
        </div>

    </>
}