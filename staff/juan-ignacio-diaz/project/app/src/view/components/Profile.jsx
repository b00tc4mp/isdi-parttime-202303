import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Button, Form, Input } from '../library'
import { Contact } from '../components'

import { updateUserMode, updateUserAvatar, updateUserPassword, retrieveUserContacts } from "../../logic"

import './Profile.css'

export default ({ onEditedProfile, onSearchUser, user, lastUpdate}) => {
    console.log('Profile -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [contacts, setContacts] = useState()

    const handleSwitchMode = async () => {
        let mode

        if (user.mode) {
            if (user.mode === 'dark') mode = 'light'
            else mode = 'dark'
        }          
        else mode = 'dark'

        try{
            freeze()
            await updateUserMode(mode)
            unfreeze() 

            alert("mode updated")
            onEditedProfile()         
        }
        catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleEditAvatar = async (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try{
            freeze()
            await updateUserAvatar (url)
            unfreeze() 

            alert("avatar updated")
            event.target.reset()
            onEditedProfile()   
        }
        catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const  handleChangePassword = async (event) => {
        event.preventDefault()

        event.target.password.classList.remove("imput-highlight")
        event.target.newPassword.classList.remove("imput-highlight")
        event.target.newPasswordConfirm.classList.remove("imput-highlight")

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            freeze()
            await updateUserPassword(password, newPassword, newPasswordConfirm)
            unfreeze()

            alert("the password is update")
            event.target.reset()
            onEditedProfile()
        }
        catch (error) {
            unfreeze()
            alert(error.message)

            if (error.cause === "password") {
                event.target.newPassword.focus()
                event.target.password.classList.add("imput-highlight")
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPassword") { 
                event.target.newPassword.focus()
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPasswordConfirm") { 
                event.target.newPasswordConfirm.focus()
                event.target.newPasswordConfirm.classList.add("imput-highlight")
            }
        }
    }

    const handleRefreshContacts = async ()  => {
        console.log('Contacts -> refresh')
        try{
            freeze()
            setContacts(await retrieveUserContacts())
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    const handleSearchUser = () => onSearchUser()

    useEffect(() => { handleRefreshContacts() }, [lastUpdate])

    return <>
            <Container tag="section" className="profile">
                <article>
                    <Button onClick={handleSwitchMode}>Switch Mode</Button>
                </article>
                <article>
                    <h2 className="text-[var(--primary)]">Update avatar</h2>

                    <Form onSubmit={handleEditAvatar}>
                        <Input type="url" name="url" placeholder="url"/>
                        <Button type="submit">Update</Button>
                    </Form>
                </article>
                <article>
                    <h2 className="text-[var(--primary)]">Update password</h2>

                    <Form onSubmit={handleChangePassword}>
                        <Input type="password" name="password" placeholder="password"/>
                        <Input type="password" name="newPassword" placeholder="new password"/>
                        <Input type="password" name="newPasswordConfirm" placeholder="new password confirmation"/>
                        <Button type="submit">Update</Button>
                    </Form>
                </article>
                <article>
                    <h2 className="text-[var(--primary)]">Contacts</h2>
                    {contacts && contacts.map(contact => <Contact 
                        key={contact.id} 
                        contact={contact} 
                        onModifyContact={handleRefreshContacts}
                        />)
                    }
                    <Button onClick={handleSearchUser}>Add</Button>
               </article>
            </Container>
        </>
}