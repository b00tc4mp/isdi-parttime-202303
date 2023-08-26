import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'
import { EditListGuest, EditListInvited, EditListContact } from '../components'

import { retrieveList, retrieveUserContacts } from '../../logic'

export default ({ listId, onAccept }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const [list, setList] = useState()
    const [contacts, setContacts] = useState()

    const handleRefreshList = async () => {
        try {
            freeze()
            const [tmpList, tmpContact] = await Promise.all([retrieveList(listId), retrieveUserContacts()])
            unfreeze()

            setList(tmpList)
            setContacts(tmpContact)

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
        handleRefreshList()
    }, [list])

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
                    {list && list.guest && list.guest.map(contact => <EditListGuest 
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
                        onModifyContact={handleRefreshList}
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
                        onInvitedContact={handleRefreshList}
                        />)
                    }

                </u>
            </section>
            <Button onClick={handleAccept}>Add</Button>
        </Container>
    </>
}