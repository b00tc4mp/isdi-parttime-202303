import './Cart.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Tabs from '../library/components/Tabs'
import CartItem from '../library/modules/CartItem'
import ButtonBar from '../library/modules/ButtonBar'
import DataItem from '../library/components/DataItem'
import Divider from '../library/components/Divider'
import { useEffect, useState, useCallback } from 'react'
import retrieveCartMeals from '../logic/retrieveCartMeals'
import useHandleError from '../logic/hooks/useHandleError'
import addMealToCart from '../logic/addMealToCart'
import Payment from '../modals/Payment'
import removeMealFromCart from '../logic/removeMealFromCart'

type Author = {
    avatar: string
    name: string
    username: string
    location: string
}

type Meal = {
    _id: string
    author: string
    title: string
    price: number
    quantity: number
}

type Order = {
    author: Author
    meals: Meal[]
}

export default function Cart() {

    const [meals, setMeals] = useState<Order[]>()
    const [lastUpdateMeals, setLastUpdateMeals] = useState(Date.now())
    const [total, setTotal] = useState(0)

    const [paymentModal, setPaymentModal] = useState(false)

    const handleErrors = useHandleError()

    const toggleTabView = () => {

    }

    const handlePay = () => {
        setPaymentModal(true)
    }

    const refreshCartMeals = () => {
        (async () => {
            try {
                const meals = await retrieveCartMeals()
                setMeals(meals)
                calculateTotal(meals)
                refreshCartMeals()
            } catch (error: any) {
                handleErrors(error)
            }
        })()

    }

    useEffect(() => {
        refreshCartMeals()
    }, [])


    const calculateTotal = (meals: Order[]) => {
        let total = 0

        meals.forEach(author => {
            author.meals.forEach(meal => {
                total += meal.quantity * meal.price
            })
        })

        setTotal(total)
    }


    const handleAddOneMore = (id: string) => {
        let foundMeal
        const meal = meals!.some(item => {
            foundMeal = item.meals.find((elem: any) => elem._id === id)
            return foundMeal
        });

        (async () => {
            try {
                await addMealToCart(id, foundMeal!.quantity)
                //setLastUpdateMeals(Date.now())
                refreshCartMeals()
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    const handleRemoveOne = (id: string) => {
        (async () => {
            try {
                await removeMealFromCart(id)
                //setLastUpdateMeals(Date.now())
                refreshCartMeals()
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    return <>
        {paymentModal ? <Payment onClose={() => setPaymentModal(false)} /> :
            <>
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
                    {meals && <div className='cart-items-list'>
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
                                num={index}
                                onPlusOne={(id) => handleAddOneMore(id)}
                                onMinusOne={(id) => handleRemoveOne(id)} />
                        })
                        }
                    </div>}
                </div>
                <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }} className='cart-buttonBar'>
                    <div className='cart-buttonBar-data-item'>
                        <DataItem label='Total' content={`${total} €`} />
                        <Divider width='100%' />
                    </div>
                </ButtonBar>
                <Tabbar cart={true} />
            </>}

    </>
}


