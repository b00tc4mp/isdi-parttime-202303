 import { useAppContext } from '../../hooks'

import { Container, Button } from '../library'

import { isIncludesCurrentUser, toggleLikeProduct, toggleProductToCart } from '../../logic'

export default ({ product: { id, owner, name, howMany, date, untried, likes, comment, state, type}, onEditList, OnModifyProduct }) => {
    console.log('Product -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditProduct = () => onEditList(id)

    const handleLikeProduct = () => {
        try {
            freeze()
            toggleLikeProduct(id)
            unfreeze()

            OnModifyProduct()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleToCart = () => {
        try {
            freeze()
            toggleProductToCart(id)
            unfreeze()

            OnModifyProduct()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <Container tag="article" type="row">
            <h1>{untried?'New':''}</h1>
            <p>{name +' ('+howMany+')'}</p>
            <time>📎 {date.toLocaleString()}</time>   
            <Button className = "button-likes" onClick={handleLikeProduct}>{isIncludesCurrentUser(likes.map((like) => like.id)) ? '❤️' : '🤍'} ({likes? likes.length : 0})</Button>
            <Button onClick={handleEditProduct}>🖍</Button>
            <Button onClick={handleToCart}>🛒</Button> 
            <p>{type}</p>
            <p>{comment}</p>
        </Container>
    </>
}