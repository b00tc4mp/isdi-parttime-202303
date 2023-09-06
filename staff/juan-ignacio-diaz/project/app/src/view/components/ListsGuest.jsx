import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { isCurrentUser, openList } from '../../logic'

export default ({ list: { id, owner, name, dateToEnd}, onEditUsersList, onAddStoresList }) => {
    console.log('ListGuest -> render')

    const { alert, navigate } = useAppContext()

    const handleEditUsersList = () => onEditUsersList(id)

    const handleAddStoresList = () => onAddStoresList(id)

    const handleOpenList = () => {
        try {
            openList(id)

            navigate('/list')
        }
        catch(error){
            alert(error.message)
        }
    }

    const isCurrentUserList = isCurrentUser(owner.id)

    return <>
        <Container tag="article" type="row">
            <p>{name}</p>
            <time>📎 {new Date(dateToEnd).toLocaleDateString()}</time>   
            {isCurrentUserList ? <Button onClick={handleEditUsersList}>👥</Button> : ''} 
            <Button onClick={handleAddStoresList}>🏬</Button> 
            <Button onClick={handleOpenList}>🛒</Button> 
        </Container>
    </>
}