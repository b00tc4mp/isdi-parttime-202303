import { useContext, useEffect, useState } from 'react'
import { HomeIcon, UserIcon, PlusIcon, MagnifyingGlassIcon, ShoppingBagIcon, SolidHomeIcon, SolidMagnifyingGlassCircleIcon, SolidPlusIcon, SolidShoppingBagIcon, SolidUserIcon } from '../icons'
import './Tabbar.css'
import useAppContext from '../../logic/hooks/useAppContext'
import retrieveUser from '../../logic/retrieveUser'
import useHandleError from '../../logic/hooks/useHandleError'
import { context } from '../../logic/context'

type Props = {
    home?: boolean,
    search?: boolean,
    add?: boolean,
    cart?: boolean,
    profile?: boolean,
}

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
}

export default function Tabbar({ home, search, add, cart, profile }: Props): JSX.Element {

    const { navigate } = useAppContext()
    const [user, setUser] = useState<User>()
    const handleErrors = useHandleError()

    useEffect(() => {
        (async () => {
            try {
                const user = await retrieveUser()
                setUser(user)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }, [])

    const onAddMeal = () => {
        if (user && user.availability.length === 0) {
            navigate('/additionalInfo')
        } else {
            navigate('/addMeal')
        }

    }

    const onProfile = () => {
        navigate('/profile')
    }

    const onHome = () => {
        navigate('/')
    }

    const onCart = () => {
        navigate('/cart')
    }

    const onSearch = () => {
        navigate('/search')
    }

    return <>
        <div className={`${context.os === 'ios' ? 'tabbar-container-ios' : 'tabbar-container'}`}>
            <div className='tabbar-item' onClick={onHome}>

                {home ? <SolidHomeIcon className='icon-s grey-700' /> : <HomeIcon className='icon-s grey-700' />}
            </div>
            <div className='tabbar-item' onClick={onSearch}>

                {search ? <SolidMagnifyingGlassCircleIcon className='icon-s grey-700' /> : <MagnifyingGlassIcon className='icon-s grey-700' />}
            </div>
            <div className='tabbar-item' onClick={onAddMeal}>

                {add ? <SolidPlusIcon className='icon-s grey-700' /> : <PlusIcon className='icon-s grey-700' />}
            </div>
            <div className='tabbar-item'>

                {cart ? <SolidShoppingBagIcon className='icon-s grey-700' /> : <ShoppingBagIcon className='icon-s grey-700' onClick={onCart} />}
            </div>
            <div className='tabbar-item' onClick={onProfile}>

                {profile ? <SolidUserIcon className='icon-s grey-700' /> : <UserIcon className='icon-s grey-700' />}
            </div>
        </div>

    </>
}

{/* <div className='tabbar-container'>
<div className='tabbar-item' onClick={onHome}>
    <HomeIcon className='icon-s grey-700' />
    {home && <div className='tabbar-selected'></div>}
</div>
<div className='tabbar-item' onClick={onSearch}>
    <MagnifyingGlassIcon className='icon-s grey-700' />
    {search && <div className='tabbar-selected'></div>}
</div>
<div className='tabbar-item' onClick={onAddMeal}>
    <PlusIcon className='icon-s grey-700' />
    {add && <div className='tabbar-selected'></div>}
</div>
<div className='tabbar-item'>
    <ShoppingBagIcon className='icon-s grey-700' onClick={onCart} />
    {cart && <div className='tabbar-selected'></div>}
</div>
<div className='tabbar-item' onClick={onProfile}>
    <UserIcon className='icon-s grey-700' />
    {profile && <div className='tabbar-selected'></div>}
</div>
</div> */}
