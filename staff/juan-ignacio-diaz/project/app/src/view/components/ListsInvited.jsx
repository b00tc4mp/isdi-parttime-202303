import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { acceptGuestList, declineGuestList } from '../../logic'

import { utils } from 'com'

const { extractSubFromToken } = utils

export default ({ list, onModifyList}) => {
    console.log('ListInvited -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleAcceptGuestList = async () => {
        try {
            freeze()
            await acceptGuestList(list.id)
            unfreeze()

            onModifyList()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleDeclineGuestList = async () => {
        try {
            freeze()
            await declineGuestList(list.id)
            unfreeze()

            onModifyList()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <Container tag="article" type="row">
            <p>{list.name}</p>
            <time>📎 {new Date(list.dateToEnd).toLocaleDateString()}</time>   
            <Button onClick={handleAcceptGuestList}>📌</Button>
            <Button onClick={handleDeclineGuestList}>🗑</Button>
        </Container>
    </>
}