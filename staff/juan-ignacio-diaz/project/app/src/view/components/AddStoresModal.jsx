import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'

import { reviewStoresList, addStoreList } from '../../logic'

export default ({ listId, onClose}) => {
    console.log('AddStores -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [stores, setStores] = useState()
 
    const handleRefreshStores = async ()  => {
        try {
            freeze()
            const stores = await reviewStoresList(listId)
            unfreeze()
            
            setStores(stores)
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }    

    function handleCancel(event) {  
        event.preventDefault()

        onClose()
    }

    const handleAddStore = async (event) => {
        event.preventDefault()

        const name = event.target.name.value
        try {
            freeze()
            await addStoreList(listId, name)
            const stores = await reviewStoresList(listId)
            unfreeze()
            
            event.target.name.value = ''
            handleRefreshStores()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        } 
    }

    useEffect(() => { handleRefreshStores() }, [])

    return <>
        <Container className="modal">
            <Container tag="section">
                <Label className="text-[var(--primary)]">Stores:</Label>
                <ul>
                    {stores && stores.map(store => <li key={store.id}>{store.name}</li>)
                    }
                </ul>
            </Container>
            <Container tag="section">
            <Form onSubmit={handleAddStore}>
                <Input type="text" name="name" placeholder="name" />
                <Button type="submit">Add</Button>
            </Form>
            <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Container>
        </Container>
    </>       
    
}