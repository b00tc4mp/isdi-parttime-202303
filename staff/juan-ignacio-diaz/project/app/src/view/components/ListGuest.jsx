import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { isCurrentUser, gotoList } from '../../logic'

export default ({ list: { id, owner, name, date}, onEditList, onGotoList }) => {
    console.log('ListGuest -> render')

    const { alert } = useAppContext()

    const handleEditList = () => onEditList(id)

    const handleGotoList = () => {
        try {
            gotoList(id)
            onGotoList()
        }
        catch(error){
            alert(error.message)
        }
    }

    const isCurrentUserList = isCurrentUser(owner.id)

    return <>
        <Container type="row">
            <p>{name}</p>
            <time>📎 {date.toLocaleString()}</time>   
            {isCurrentUserList ? <Button onClick={handleEditList}>🖍</Button> : ''} 
            <Button onClick={handleGotoList}>🛒</Button> 
        </Container>
    </>
}