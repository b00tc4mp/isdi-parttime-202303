import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { ListsGuest, ListsInvited } from '.'
import { Container, Button, Label } from '../library'

import { retrieveListsInvited, retrieveListsGuest } from '../../logic'

export default ({ onEditedList, onCreatedList, lastUpdate }) => {
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

    const handleGotoList = (id) => OnOpenList()

    useEffect(() => {      
        handleRefreshLists()
    }, [lastUpdate])

    return <>
        <Container tag="section">
            <Button onClick={handleNewList}>New list</Button>
            <Label >Guest of the lists:</Label>
            <section>
                {listsGuest && listsGuest.map(list => <ListsGuest
                        key={list.id} 
                        list={list} 
                        onEditList={onEditedList}
                    />)
                }
            </section>
        </Container>
        <Container tag="section">
            <Label >Invitation to the lists:</Label>
            <section>
                {listsInvited && listsInvited.map(list => <ListsInvited 
                        key={list.id} 
                        list={list} 
                        onModifyList={handleRefreshLists}
                    />)
                }
            </section>
        </Container>

    </>
}