import { useAppContext } from '../../hooks'

import { DEFAULT_AVATAR_URL } from '../../constants'

import { deleteUserContact } from '../../logic'

export default ({ contact: { id, name, avatar}, onModifyContact}) => {
    console.log('Contact -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleDeleteContact = async () => {
        try{
            freeze()
            await deleteUserContact(id)
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
                    <button onClick={handleDeleteContact}>🗑</button>      
                </div>
            </div>

        </li>
    </>
}