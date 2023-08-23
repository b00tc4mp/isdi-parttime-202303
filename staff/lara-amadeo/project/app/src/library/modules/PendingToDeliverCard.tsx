import { ReactElement, useState } from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import DataItem from '../components/DataItem'
import './PendingToDeliverCard.css'
import markAsReady from '../../logic/markAsReady'
import useHandleError from '../../logic/hooks/useHandleError'
import { ChevronDownIcon, ChevronUpIcon } from '../icons'
import Chip from '../components/Chip'


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
    meals: MealOrder[],
    serial: string,
    chipLabel: string,
    chipStatus: string
}

export default function PendingOrderCard({ buyer, pickUp, meals, serial, chipLabel, chipStatus }: Props) {
    const handleErrors = useHandleError()

    const [openCard, setOpenCard] = useState(false)

    const onReadyClick = (serial: string) => {
        (async () => {
            try {
                await markAsReady(serial)
                setOpenCard(false)
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    const toggleOpenCard = () => {
        setOpenCard(!openCard)
    }


    return <>
        <Container width={'100%'} height={'fit-content'} type={'border'}>
            <>

                <div className='pendingToDeliver-pick-n-chip'>
                    <DataItem label='Pick-up time' content={'Tuesday, 12:00 - 14:00'} />
                    <Chip label={chipLabel} state={chipStatus} />
                </div>

                {openCard && <>
                    <DataItem label='For' content={buyer} />
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
                </>}

                {openCard && chipLabel === 'pending' && <div className='pendingToDeliver-button-area'>
                    <Button type={'secondary'} size={'extrasmall'} label={'Cancel'} />
                    <Button type={'primary'} size={'extrasmall'} label={'Ready'} onClick={() => onReadyClick(serial)} />
                </div>}

                <div className='pendingToDeliver-chevron-container'>
                    {openCard ? <ChevronUpIcon className='icon-s grey-700' onClick={toggleOpenCard} /> : <ChevronDownIcon className='icon-s grey-700' onClick={toggleOpenCard} />}
                </div>
            </>
        </Container>
    </>
}