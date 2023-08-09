import Avatar from '../components/Avatar'
import Chip from '../components/Chip'
import Container from '../components/Container'
import './PendingOrderCard.css'

type Props = {
    image: string,
    chefName: string,
    chip: { label: string, status: string },
    quantity: number,
    total: number,
    serial: string,
    date: string
}

export default function PendingOrderCard({ image, chefName, chip, quantity, total, serial, date }: Props) {

    return <>
        <Container width={'100%'} height={'fit-content'} type={'shadow'} elevation={'1'}>
            <>
                <div className='pending-order-info-n-avatar'>
                    <Avatar image={image} width={'48px'} />
                    <div className='pending-order-info'>
                        <div className='pending-order-first-row'>
                            <p className='body-text-bold'>{chefName}</p>
                            <Chip label={chip.label} state={chip.status} />
                        </div>

                        <div className='pending-order-second-row'>
                            <p className='body-text-bold pending-order-meal-label'>{quantity}<p className='body-text grey-700'>meals</p></p>
                            <p className='medium-text-bold'>{`${total} €`}</p>
                        </div>

                        <div className='pending-order-third-row'>
                            <p className='small-text grey-400'>{serial}</p>
                            <p className='small-text grey-400'>{date}</p>
                        </div>
                    </div>
                </div>
            </>
        </Container>
    </>
}

