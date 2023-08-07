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
import Header from '../library/components/Header'
import EmptyState from '../library/components/EmptyState'

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
    const [total, setTotal] = useState(0)
    const [tabView, setTabView] = useState(true)
    const [pendingMeals, setPendingMeals] = useState()

    const [paymentModal, setPaymentModal] = useState(false)

    const handleErrors = useHandleError()

    const toggleTabView = () => {
        setTabView(!tabView)
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
                            selected: tabView,
                            onClick: toggleTabView
                        },
                        {
                            label: "To pick up",
                            selected: !tabView,
                            onClick: toggleTabView
                        }]} />

                    {/* CART TAB */}
                    {tabView &&
                        <>
                            {meals && meals.length > 0 && <>
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
                            </>}

                            {/* CART - EMPTY STATE */}
                            {meals && meals.length === 0 && <>
                                <div className='cart-empty-state-container'>
                                    <EmptyState src='/illustrations/beach-girl.gif' title='No meals added yet!' description='dd some meals to your cart to start enjoying Yuper!' />
                                </div>
                            </>}

                            {/* CART - BUTTON BAR */}
                            {meals && meals.length > 0 && <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }} className='cart-buttonBar'>
                                <div className='cart-buttonBar-data-item'>
                                    <DataItem label='Total' content={`${total} €`} />
                                    <Divider width='100%' />
                                </div>
                            </ButtonBar>}
                        </>}

                    {/* PENDING TAB */}
                    {!tabView &&
                        <>
                            <div className='cart-empty-state-container'>

                                <p className='heading-s' style={{ textAlign: 'center' }}>TODO!!!!!</p>
                                <p className='body-text grey-700' style={{ marginBottom: '16px', marginTop: '8px', textAlign: 'center', width: '90%' }}></p>
                            </div>
                        </>}
                </div>
                <Tabbar cart={true} />
            </>
        }

    </>
}


