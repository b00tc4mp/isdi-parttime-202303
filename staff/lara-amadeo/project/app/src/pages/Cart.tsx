import './Cart.css'
import Topbar from '../library/modules/Topbar'
import Tabbar from '../library/modules/Tabbar'
import Tabs from '../library/components/Tabs'
import CartItem from '../library/modules/CartItem'
import ButtonBar from '../library/modules/ButtonBar'
import DataItem from '../library/components/DataItem'
import Divider from '../library/components/Divider'
import { useEffect, useState } from 'react'
import retrieveCartMeals from '../logic/retrieveCartMeals'
import useHandleError from '../logic/hooks/useHandleError'
import addMealToCart from '../logic/addMealToCart'
import Payment from '../modals/Payment'
import removeMealFromCart from '../logic/removeMealFromCart'
import EmptyState from '../library/components/EmptyState'
import PendingOrderCard from '../library/modules/PendingOrderCard'
import retrievePendingToPickUp from '../logic/retrievePendingToPickUp'
import incrementMealsInCart from '../logic/incrementMealsinCart'
import { Timeout } from 'react-number-format/types/types'
import formatDate from '../logic/formatDate'
import useAppContext from '../logic/hooks/useAppContext'


type Order = {
    author: Author
    meals: Meal[]
}

//pending

type Author = {
    _id: string
    username: string
    name: string
    email: string
    password: string
    description: string
    tags: string[]
    avatar: string
    availability: object[]
    location: string
    likedChefs: string[]
    reviews: object[]
    cart: object[]
    order: any[]
    selledMeals: SelledMeal[]
    __v: number
}

type Meal = {
    _id: string
    author: string
    images: string[]
    title: string
    description: string
    categories: string[]
    ingredients: string[]
    quantity: number
    bestBefore: string
    price: number
    date: string
    __v: number
}

type SelledMeal = {
    meal: string
    quantity: number
    author: string
    buyer: string
    status: string
    _id: string
}

type Item = {
    author: Author
    meals: { meal: Meal, quantity: number }[]
}

type PendingToPickUp = {
    serial: string
    date: string
    items: Item[]
}



export default function Cart() {

    const { navigate } = useAppContext()

    const [meals, setMeals] = useState<Order[]>()
    const [lastQuantity, setLastQuantity] = useState()

    const [timeoutId, setTimeoutId] = useState<Timeout>()

    const [total, setTotal] = useState(0)
    const [cartView, setCartView] = useState(true)
    const [pendingMeals, setPendingMeals] = useState<PendingToPickUp[]>()

    const [paymentModal, setPaymentModal] = useState(false)

    const handleErrors = useHandleError()

    const handlePay = () => {
        setPaymentModal(true)
    }

    const refreshCartMeals = () => {
        (async () => {
            try {
                const meals = await retrieveCartMeals()
                setMeals(meals)
                calculateTotal(meals)


                const pendingMeals = await retrievePendingToPickUp()
                setPendingMeals(pendingMeals)

            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    useEffect(() => {
        refreshCartMeals()
    }, [])

    const toggleTabView = () => {
        setCartView(!cartView)
        if (cartView === true)
            refreshCartMeals()
    }

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
        const foundMeal = findMealById(id, meals!)
        if (foundMeal) foundMeal.quantity++

        setMeals(meals);

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        const newTimeoutId = setTimeout(() => {
            (async () => {
                try {
                    await incrementMealsInCart(id, foundMeal!.quantity)

                } catch (error: any) {
                    handleErrors(error)
                }
            })()

        }, 500)
        setTimeoutId(newTimeoutId)
    }


    const findMealById = (id: string, meals: Order[]) => {
        let foundMeal = null

        meals.forEach((item: any) => {
            const meal = item.meals.find((meal: any) => meal._id === id)
            if (meal) {
                foundMeal = meal
                return
            }
        })

        return foundMeal
    }

    const handleRemoveOne = (id: string) => {
        const foundMeal = findMealById(id, meals!)
        if (foundMeal) foundMeal.quantity -= 1

        setMeals(meals);

        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        const newTimeoutId = setTimeout(() => {

            (async () => {
                try {
                    await removeMealFromCart(id, foundMeal!.quantity)
                    refreshCartMeals()
                } catch (error: any) {
                    handleErrors(error)
                }
            })()
        }, 500)
        setTimeoutId(newTimeoutId)
    }

    return <>
        {paymentModal ? <Payment onPaymentClose={() => setPaymentModal(false)} onPaymentSummaryClose={() => navigate('/')} /> :
            <>
                <Topbar level={'first'} />
                <div className="page-first-level" >
                    <Tabs items={[
                        {
                            label: "Your order",
                            selected: cartView,
                            onClick: toggleTabView
                        },
                        {
                            label: "To pick up",
                            selected: !cartView,
                            onClick: pendingMeals?.length === 0 ? null : toggleTabView,
                            disable: pendingMeals?.length === 0
                        }]} />

                    {/* CART TAB */}
                    {cartView &&
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
                                    <EmptyState src='/illustrations/beach-girl.gif' title='No meals added yet!' description='Add some meals to your cart to start enjoying Yuper!' marginBottom='-32px' />
                                </div>
                            </>}


                        </>}

                    {/* PENDING TAB */}
                    {!cartView &&
                        <>
                            {pendingMeals?.length === 0 && <>
                                <div className='cart-empty-state-container'>
                                    <EmptyState src='/illustrations/beach-girl.gif' title='No orders in process!' description='Start paying some meals!!!' />
                                </div>
                            </>}
                            {pendingMeals && <div className='cart-items-list'>
                                {pendingMeals.map((obj: PendingToPickUp) => {
                                    let _serial = obj.serial
                                    let _date = formatDate(new Date(obj.date))
                                    return obj.items.map((item: Item) => {
                                        let _quantity: number = 0
                                        for (const meal of item.meals) {
                                            _quantity += meal.quantity
                                        }

                                        return <PendingOrderCard
                                            image={item.author.avatar}
                                            chefName={item.author.name}
                                            chip={{ label: 'pending', status: 'warning' }}
                                            quantity={_quantity}
                                            total={22}
                                            serial={_serial}
                                            date={_date} />
                                    })
                                })}
                            </div>}
                        </>}
                </div>
                {/* CART - BUTTON BAR */}
                {cartView && meals && meals.length > 0 && <ButtonBar firstButton={{ label: "Pay", onClick: handlePay }} className='cart-buttonBar'>
                    <div className='cart-buttonBar-data-item'>
                        <DataItem label='Total' content={`${total} €`} />
                        <Divider width='100%' />
                    </div>
                </ButtonBar>}
                <Tabbar cart={true} />
            </>
        }

    </>
}


