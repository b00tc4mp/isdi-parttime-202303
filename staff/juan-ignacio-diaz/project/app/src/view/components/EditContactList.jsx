import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { addUserToInvitedList } from '../../logic'

import { DEFAULT_AVATAR_URL } from '../../constants'

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
        <Container tag="article" type="row">
            <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
            <h1 className="name">{name}</h1>
            <Button onClick={handleAddContact}>+</Button>      
        </Container>
    </>
}