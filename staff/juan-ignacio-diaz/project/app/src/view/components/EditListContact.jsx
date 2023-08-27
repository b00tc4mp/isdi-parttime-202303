import { useAppContext } from '../../hooks'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import { addUserToInvitedList } from '../../logic'

export default ({ listId,  contact: { id, name, avatar}, onInvitedContact}) => {
    console.log('Edit List Contact -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleAddContact = async () => {
        try{
            freeze()
            await addUserToInvitedList(listId, id)
            unfreeze()

            onInvitedContact()
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
                    <button onClick={handleAddContact}>+</button>      
                </div>
            </div>

        </li>
    </>
}