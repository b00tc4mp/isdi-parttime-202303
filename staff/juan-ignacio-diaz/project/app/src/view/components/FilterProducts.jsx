
import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'
import { Stores, ProductTypes } from '../components'

import { retrieveProduct, deleteProductToList, editProductToList } from '../../logic'

export default ({ onCancel, onModifiedFilter }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const handleFilterProducts = (event) => {
        event.preventDefault()

        const filter = {}

        if (event.target.storesCheck.checked) filter.stores = [...event.target.stores.selectedOptions].map(option => option.value)

        if (event.target.typeCheck.checked) filter.type = [...event.target.type.selectedOptions].map(option => option.value)

        if (event.target.statesCheck.checked) filter.state = [...event.target.states.selectedOptions].map(option => option.value)

        if (event.target.likesCheck.checked) filter.likes = event.target.likes.value


        onModifiedFilter()
    }

    const handleCancel = (event) => {  
        event.preventDefault()

        onCancel()
    }

    return <>
        <Container className = "modal">
            <Container tag="section">
                <Form onSubmit={handleFilterProducts}>                
                    <Label htmlFor="stores"><Input type="checkbox" name="storesCheck" value="stores" /> Stores:</Label>                    
                    <Stores state={[]} multiple={true} />                    

                    <Label htmlFor="type"><Input type="checkbox" name="typeCheck" value="type" /> Types:</Label>                               
                    <ProductTypes state={''} multiple={true} />  

                    <Label htmlFor="states"><Input type="checkbox" name="statesCheck" value="states" />  State:</Label>
                                    
                    <select name="states">  
                        <option value="">Out of cart</option> 
                        <option value="selected">In cart</option> 
                        <option value="bought">Bought</option> 
                    </select>

                    <Label htmlFor="likes"><Input type="checkbox" name="likesCheck" value="likes" />    Nª likes</Label>
                      
                    <Input type="number" name="likes" min="1" step="1" />
       
                    <Button type="submit">Update</Button> 
                    <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
                </Form>
            </Container>
        </Container>
    </>
}