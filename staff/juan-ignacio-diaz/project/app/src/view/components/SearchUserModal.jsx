import { useState, useEffect } from 'react'
import { useAppContext } from '../../hooks'

import { Container, Input, Button, Label } from '../library'

import { searchUser, addUserContact } from '../../logic'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

export default ({ onCancel, onModifyContact }) => {

    const { alert, freeze, unfreeze } = useAppContext()

    const [user, setUser] = useState()

    const handleSearchUser = async (event) => {
        event.preventDefault()

        const email = event.target.value

        try{
            freeze()
            const tmpUser = await searchUser(email)
            unfreeze()

            setUser(tmpUser)
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    const handleFoundUser = async () => {
        try{
            freeze()
            await addUserContact(user.id)
            unfreeze()

            onModifyContact()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <Container tag="div" className="modal">
            <Container tag="div" className="register">
                <h1 className="text-[var(--primary)]">Search User</h1>
                <Label htmlFor="emailRegister">E-mail to search:</Label>
                <Input type="email" name="email" placeholder="usuario@dominio.com" onChange={handleSearchUser} />

                {user && <>
                    <Label htmlFor="emailRegister">E-mail:</Label>
                    <Label type="email" name="email">{user.email}</Label>

                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label name="name" >{user.name}</Label>
                    <Button onClick={handleFoundUser}>Add</Button>
                </> 
                || <>
                    <Label htmlFor="emailRegister">E-mail:</Label>
                    <Label type="email" name="email" placeholder="usuario@dominio.com" />
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Label name="name" placeholder="name"></Label>
                </>}  

                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Container>
        </Container>
    </>
    
}