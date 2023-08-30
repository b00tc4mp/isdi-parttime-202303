import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Product, Message } from '.'
import { Container, Button, Label } from '../library'

import { retrieveFilteredProducts, retrieveMessages} from '../../logic'

export default ({ lastUpdate, onModifyedList, onAddedProduct, onEditedProduct, onFilteredProducts }) => {
    console.log('Lists -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [filter, setFilter] = useState({})
    const [products, setProducts] = useState()
    const [messages, setMessages] = useState()
   
    const handleRefreshList = async ()  => {
        try{
            freeze()
            const [products, messages] = await Promise.all([retrieveFilteredProducts(filter, ''), retrieveMessages()]) 
            setProducts(products)
            setMessages(messages)
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => {      
        handleRefreshList()
    }, [])

    const handleNewFilter = () => onNewFilter()

    return <>
        <Container>
            <Label >Products:</Label>
            <Button onClick={handleNewFilter}>Filter</Button>
            <Container tag="section">
                {products && products.map(product => <Product
                        key={product.id} 
                        product={product} 
                       // onEditProduct={onEditedProduct}
                        onModifyList={handleRefreshList}
                    />)
                }
            </Container>
            <Label >Messages:</Label>
            <Container tag="section">
                {messages && messages.map(message => <Message 
                        key={list.id} 
                        message={message} 
                    />)
                }
            </Container>
        </Container>

    </>
}