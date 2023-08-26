import { useAppContext } from '../../hooks'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import { deleteUserContact } from '../../logic'

export default ({ contact: { name, avatar}}) => {
    console.log('Edit List Guest -> render')

    return <>
        <li>
            <div className="post-Author">
                <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{name}</h1>
            </div>

        </li>
    </>
}