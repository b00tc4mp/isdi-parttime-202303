import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'

import { createList } from '../../logic'

export default ({ onCancel, onCreatedList }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    const handleCreateList = async (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const date = event.target.date.value

        try {
            freeze()
            await createList(name, new Date(date))
            unfreeze()

            onCreatedList()      
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <Container tag="section" className="modal">
            <Form onSubmit={handleCreateList}>
                <Label htmlFor="nameRegister">Name:</Label>
                <Input type="text" name="name" placeholder="name" />
                <Label htmlFor="emailRegister">Date End:</Label>
                <Input type="date" name="date" />
                <Button type="submit">Create</Button>
                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>
    </>
}