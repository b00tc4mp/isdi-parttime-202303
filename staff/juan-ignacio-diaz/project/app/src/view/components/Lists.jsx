import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { ListGuest, ListInvited } from '.'
import { Container, Button, Label } from '../library'

import { retrieveListsInvited, retrieveListsGuest, acceptGuestList } from '../../logic'

export default ({ onEditedList, onCreatedList, onGotoList, lastUpdate }) => {
    console.log('Lists -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [listsInvited, setListsInvited] = useState()
    const [listsGuest, setListsGuest] = useState()
   
    const handleRefreshLists = async ()  => {
        try{
            freeze()
            const [tmpListsInvited, tmpListsGuest] = await Promise.all([retrieveListsInvited(), retrieveListsGuest()]) 
            setListsInvited(tmpListsInvited)
            setListsGuest(tmpListsGuest)
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    const handleNewList = () => onCreatedList()

    const handleGotoList = (id) => onGotoList(id)

    useEffect(() => {      
        handleRefreshLists()
    }, [lastUpdate])

    return <>
        <Container tag="section">
            <Button onClick={handleNewList}>New list</Button>
            <Label >Guest of the lists:</Label>
            <section>
                {listsGuest && listsGuest.map(list => <ListGuest
                        key={list.id} 
                        list={list} 
                        onEditList={onEditedList}
                        onGotoList={handleGotoList}
                    />)
                }
            </section>
        </Container>
        <Container tag="section">
            <Label >Invitation to the lists:</Label>
            <section>
                {listsInvited && listsInvited.map(list => <ListInvited 
                        key={list.id} 
                        list={list} 
                        onModifyList={handleRefreshLists}
                    />)
                }
            </section>
        </Container>

    </>
}