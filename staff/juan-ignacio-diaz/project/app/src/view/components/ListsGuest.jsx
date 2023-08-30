import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { isCurrentUser, openList } from '../../logic'

export default ({ list: { id, owner, name, date}, onEditList, OnOpenList }) => {
    console.log('ListGuest -> render')

    const { alert, navigate } = useAppContext()

    const handleEditList = () => onEditList(id)

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
            <time>📎 {date.toLocaleString()}</time>   
            {isCurrentUserList ? <Button onClick={handleEditList}>🖍</Button> : ''} 
            <Button onClick={handleOpenList}>🛒</Button> 
        </Container>
    </>
}