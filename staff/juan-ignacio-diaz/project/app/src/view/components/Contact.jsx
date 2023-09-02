import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

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
        <Container tag="article" type="row">
            <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
            <h1 className="name">{name}</h1>
            <Button onClick={handleDeleteContact}>🗑</Button>      
        </Container>
    </>
}