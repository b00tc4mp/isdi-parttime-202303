import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'
import { EditListGuest, EditListInvited, EditListContact } from '../components'

import { retrieveList, retrieveUserContacts } from '../../logic'

export default ({ listId, onAccept }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const [list, setList] = useState()
    const [contacts, setContacts] = useState()
   

    const handleRefreshEditList = async () => {
        try {
            freeze()
            const [tmpList, tmpContacs] = await Promise.all([ retrieveList(listId), retrieveUserContacts()])
            setList(tmpList)  
            setContacts(tmpContacs)

            //setList( await retrieveList(listId))
            //setContacts(await retrieveUserContacts())
            unfreeze()
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    function handleAccept(event) {
        event.preventDefault()

        onAccept()
    }

    useEffect(() => {      
         handleRefreshEditList()
    }, [])

    return <>
        <Container tag="section" className="modal">
            <section>
                {list && <>
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label type="text" name="name" placeholder="name">{list.name}</Label>
                    <Label htmlFor="emailRegister">Date End:</Label>
                    <Label type="date" name="date">{list.dateToEnd}</Label>
                </>
                || <>
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label type="text" name="name" placeholder="name" />
                    <Label htmlFor="emailRegister">Date End:</Label>
                    <Label type="date" name="date" />
                </>}
            </section>
            <section>
                <h2>Guest</h2>

                <u>
                    {list && list.guests && list.guests.map(contact => <EditListGuest 
                        key={contact.id} 
                        contact={contact} 
                        />)
                    }

                </u>
            </section>
            <section>
                <h2>Invited</h2>

                <u>
                    {list && list.invited && list.invited.map(contact => <EditListInvited 
                        key={contact.id} 
                        contact={contact} 
                        listId={listId}
                        onModifyContact={handleRefreshEditList}
                        />)
                    }

                </u>
            </section>
            <section>
                <h2>Add contact</h2>

                <u>
                    {contacts && contacts.map(contact => <EditListContact 
                        key={contact.id} 
                        contact={contact} 
                        listId={listId}
                        onInvitedContact={handleRefreshEditList}
                        />)
                    }

                </u>
            </section>
            <Button onClick={handleAccept}>Accept</Button>
        </Container>
    </>
}