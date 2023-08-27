import { useAppContext } from '../../hooks'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import { declineGuestList } from '../../logic'

export default ({ listId, contact: { id, name, avatar}, onModifyContact}) => {
    console.log('Edit List Invited -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleDeleteInvited = async () => {
        try{
            freeze()
            await declineGuestList(listId, id)
            unfreeze()

            onModifyContact()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <li>
            <div className="post-Author">
                <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{name}</h1>

                <div>
                    <button onClick={handleDeleteInvited}>🗑</button>      
                </div>
            </div>

        </li>
    </>
}