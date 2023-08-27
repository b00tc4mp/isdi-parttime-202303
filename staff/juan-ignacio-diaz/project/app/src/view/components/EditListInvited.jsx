import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { deleteUserToInvitedList } from '../../logic'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default ({ listId, contact: { id, name, avatar}, onModifyContact}) => {
    console.log('Edit List Invited -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleDeleteInvited = async () => {
        try{
            freeze()
            await deleteUserToInvitedList(listId, id)
            unfreeze()

            onModifyContact()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
            <Container type="row">
                <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{name}</h1>
                <Button onClick={handleDeleteInvited}>🗑</Button>      
            </Container>
    </>
}