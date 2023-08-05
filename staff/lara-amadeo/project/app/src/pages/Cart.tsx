import './Cart.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Tabs from '../library/components/Tabs'
import CartItem from '../library/modules/CartItem'
import ButtonBar from '../library/modules/ButtonBar'
import DataItem from '../library/components/DataItem'
import Divider from '../library/components/Divider'

const meals = [
    {
        author: { avatar: 'https://blankhearts.com/wp-content/uploads/2022/10/girl-whatsapp-dp-15.jpg', name: 'Lara Gonzalez', username: 'larara96' },
        meals: [
            {
                id: 'mealID',
                title: 'Manzana podrida',
                quantity: 2,
                price: 3.50
            },
            {
                id: 'mealID',
                title: 'Lechuga podrida',
                quantity: 4,
                price: 6.50
            }
        ]
    },
    {
        author: { avatar: 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ibGFja19hbmltZV9naXJsX3Byb2ZpbGVfcGljX3NjcmVlbl8wXzE2NzY5NDU5NjZfMDIw/screen-0.webp?fakeurl=1&type=.webp', name: 'pedro', username: 'pedrito' },
        meals: [
            {
                id: 'mealID',
                title: 'Tarta podrida',
                quantity: 7,
                price: 7.50
            },
            {
                id: 'mealID',
                title: 'Carne podrida',
                quantity: 1,
                price: 9.50
            }
        ]
    }
]

export default function Cart() {

    const toggleTabView = () => {

    }

    const handlePay = () => {

    }
    return <>
        <Topbar level={'first'} />
        <div className="page-first-level" >
            <Tabs items={[
                {
                    label: "Your order",
                    selected: true,
                    onClick: toggleTabView
                },
                {
                    label: "To pick up",
                    selected: false,
                    onClick: toggleTabView
                }]} />
            <div className='cart-items-list'>
                {meals.map((meal, index) => {
                    return <CartItem
                        author={
                            {
                                avatar: meal.author.avatar,
                                name: meal.author.name,
                                username: `@${meal.author.username}`
                            }}
                        items={meal.meals}
                        length={meals.length}
                        num={index} />
                })
                }
            </div>
        </div>
        <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }}>
            <div className='cart-buttonBar-data-item'>
                <DataItem label='Total' content={'12,50€'} />
                <Divider width='100%' />
            </div>
        </ButtonBar>
        <Tabbar cart={true} />
    </>
}


