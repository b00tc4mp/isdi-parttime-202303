import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label } from '../library'
import { Stores, ProductTypes } from '../components'

import { retrieveProduct, deleteProductToList, editProductToList } from '../../logic'

export default ({ productId, onCancel, onModifiedProduct }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const [product, setProduct] = useState()

    const handleRefresProduct = async () => {
        try{     
            freeze()     
            const tmpProduct = await retrieveProduct(productId)
            unfreeze()

            setProduct(tmpProduct)
        } 
        catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleEditProduct = async (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const howMany = event.target.howMany.valueAsNumber
        const stores = [...event.target.stores.selectedOptions].map(option => option.value)
        const type = event.target.type.value
        const comment = event.target.comment.value

        try {
            freeze()
            await editProductToList(productId, name, howMany, stores, type, comment)
            unfreeze()

            onModifiedProduct()      
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleDeleteProduct = async (event) => {
        try {
            freeze()
            await deleteProductToList(productId)
            unfreeze()

            onModifiedProduct()      
        } catch(error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleCancel = (event) => {  
        event.preventDefault()

        onCancel()
    }

    useEffect(() => {      
        handleRefresProduct()
    }, [])

    return <>
        <Container>
            <Container tag="section">
                {product && <>
                    <Container tag="article" type="row">
                        <Label htmlFor="authorr">Author:</Label>   
                        <img className="home-header-avatar" src={product.author.avatar? product.author.avatar : DEFAULT_AVATAR_URL} alt=""/>
                        <h1 className="name">{product.author.name}</h1>
                    </Container>
                    <Label htmlFor="likes">Have {product.likes? product.likes.length : 0} Likes:</Label> 
                    <Form onSubmit={handleEditProduct}>                
                        <Label htmlFor="nameRegister">Name:</Label>                
                        <Input type="text" name="name" placeholder="name" defaultValue={product.name}></Input>                  
                        <Label htmlFor="howMany">How many:</Label>
                        <Input type="number" name="howMany" defaultValue={product.howMany}></Input>                   
                        <Label htmlFor="stores">Stores:</Label>
                        <Stores 
                            state={product.stores.map(store => (store.id))} //({value: store.id, label: store.name}))}
                            multiple={true}
                        />                    
                        <Label htmlFor="type">Type:</Label>
                        <ProductTypes 
                            state={{value: product.type}}
                        />                      
                        <Label htmlFor="comment">Comment:</Label>
                        <textarea className="input" name="comment" cols="30" rows="4" placeholder="text" defaultValue={product.comment}></textarea>
                        <Container type="row">
                            <Button type="submit">Update</Button> 
                            <Button type="button" onClick={handleDeleteProduct}>Delete</Button>
                        </Container>
                        <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </>
                || <>
                    <Form onSubmit={handleEditProduct}>
                        <Label htmlFor="nameRegister">Name:</Label>
                        <Input type="text" name="name" placeholder="name" />                    
                        <Label htmlFor="howMany">How many:</Label>
                        <Input type="number" name="howMany" defaultValue="1"/>        
                        <Label htmlFor="stores">Stores:</Label>
             
                        <Label htmlFor="type">Type:</Label>
        
                        <Label htmlFor="comment">Comment:</Label>
                        <textarea className="input" name="comment" cols="30" rows="5" placeholder="text"></textarea>
                        <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
                    </Form>                   
                </>}
            </Container>
        </Container>
    </>
}

