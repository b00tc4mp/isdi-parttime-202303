import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { ListsGuest, ListsInvited } from '.'
import { Container, Button, Label } from '../library'

import { retrieveListsInvited, retrieveListsGuest } from '../../logic'

export default ({ onEditUsersList, onCreateList, onAddStoresList, lastUpdate }) => {
    console.log('Lists -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [listsInvited, setListsInvited] = useState()
    const [listsGuest, setListsGuest] = useState()
   
    const handleRefreshLists = async ()  => {
        try{
            freeze()
            const [tmpListsInvited, tmpListsGuest] = await Promise.all([retrieveListsInvited(), retrieveListsGuest()]) 
            unfreeze()

            setListsInvited(tmpListsInvited)
            setListsGuest(tmpListsGuest)
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    const handleNewList = () => onCreateList()

    const handleGotoList = (id) => OnOpenList()

    useEffect(() => {      
        handleRefreshLists()
    }, [lastUpdate])

    return <>
        <Container tag="section">
            <Button onClick={handleNewList}>New list</Button>
            <Label className="text-[var(--primary)]">Guest of the lists:</Label>
            <section>
                {listsGuest && listsGuest.map(list => <ListsGuest
                        key={list.id} 
                        list={list} 
                        onEditUsersList={onEditUsersList}
                        onAddStoresList={onAddStoresList}
                    />)
                }
            </section>
        </Container>
        <Container tag="section">
            <Label className="text-[var(--primary)]">Invitation to the lists:</Label>
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