import { ReactElement } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import DataItem from '../components/DataItem'
import './PendingToDeliverCard.css'


type Meal = {
    images: string[],
    title: string,
    description: string,
    categories: Array<string>,
    price: string,
    id: string,
    quantity: number
}

interface MealOrder {
    meal: Meal;
    quantity: number;
}

interface Order {
    serial: string;
    meals: MealOrder[];
    buyer: string;
    status: string;
}

type Props = {
    buyer: string,
    pickUp?: object,
    meals: MealOrder[]
}

export default function PendingOrderCard({ buyer, pickUp, meals }: Props) {



    return <>
        <Container width={'100%'} height={'fit-content'} type={'border'}>
            <>
                <Container width={'100%'} height={'fit-content'} type={'shadow'} elevation={'1'}>
                    {/* @ts-ignore */}
                    <div className='pendingToDeliver-meal-info-container'>
                        {meals && meals.map((item) => {
                            return <>
                                <div className='pendingToDeliver-meal-info'>
                                    <p className='body-text-bold grey-700'>{item.quantity}</p>
                                    <p className='body-text grey-700'>{item.meal.title}</p>
                                </div>
                            </>
                        })}
                    </div>
                </Container>
                <DataItem label='For' content={buyer} />
                {/* <DataItem label='Pick-up time' content={} */}
                <div className='pendingToDeliver-button-area'>
                    <Button type={'secondary'} size={'extrasmall'} label={'Cancel'} />
                    <Button type={'primary'} size={'extrasmall'} label={'Ready'} />
                </div>
            </>
        </Container>
    </>
}