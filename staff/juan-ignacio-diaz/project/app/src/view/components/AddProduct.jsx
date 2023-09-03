import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'
import { Stores, ProductTypes } from '../components'

import { addProductToList } from '../../logic'

export default ({ onCancel, onAddedPropduct }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const handleAddProduct = async (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const howMany = event.target.howMany.valueAsNumber
        const stores = [...event.target.stores.selectedOptions].map(option => option.value)
        const type = event.target.type.value
        const comment = event.target.comment.value

        try {
            freeze()
            await addProductToList(name, howMany, stores, type, comment)
            unfreeze()

            onAddedPropduct()      
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    return <>
        <Container>
            <Container tag="section">
                <Form onSubmit={handleAddProduct}>
                    <Label htmlFor="nameRegister">Name:</Label>
                    <Input type="text" name="name" placeholder="name" />
                    
                    <Label htmlFor="howMany">How many:</Label>
                    <Input type="number" name="howMany" defaultValue="1" min="1" step="1"/>
                    
                    <Label htmlFor="stores">Stores:</Label>
                    <Stores 
                        defaultValue={[]}
                    />
                    
                    <Label htmlFor="type">Type:</Label>
                    <ProductTypes 
                        defaultValue={""}
                    />
                    
                    <Label htmlFor="comment">Comment:</Label>
                    <textarea className="input" name="comment" cols="30" rows="10" placeholder="text"></textarea>

                    <Button type="submit">Create</Button>
                    <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
                </Form>
            </Container>
        </Container>
    </>
}