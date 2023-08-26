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
            setListsInvited( await retrieveListsInvited())
            setListsGuest( await retrieveListsGuest())
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => {      
        handleRefreshLists()
    }, [lastUpdate])

    const handleNewList = () => onCreatedList()

    const handleGotoList = (id) => onGotoList(id)

    const handleAcceptlist = async (id) => {
        try{
            freeze()
            setListsInvited( await acceptGuestList(id))
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    return <>
        <Container tag="section" className="profile">
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
        <Container tag="section" className="profile">
            <Label >Invitation to the lists:</Label>
            <section>
                {listsInvited && listsInvited.map(list => <ListActive 
                        key={list.id} 
                        list={list} 
                        onAcceptList={handleAcceptlist(list.id)}
                    />)
                }
            </section>
        </Container>

    </>
}