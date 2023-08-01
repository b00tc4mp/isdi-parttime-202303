import Avatar from '../components/Avatar'
import CategoryIcon from '../components/CategoryIcon'
import Container from '../components/Container'
import './MealCard.css'

export default function Tabbar({ image, title, description, user, categories }) {
    let price = '13,50'
    return <>
        <Container width={'382px'} height={'fit-content'} type={'shadow'} elevation={'1'}>
            <div className='meal-card-container'>
                {/* left-side */}
                <img className='meal-card-image' src={`${image}`}></img>

                {/* right-side */}
                <div className='meal-card-data'>

                    {/* upper-part */}
                    <div className='meal-card-data-upper'>
                        <p className='meal-card-data-title body-text-bold grey-700'>{title}</p>
                        <p className='meal-card-data-description tiny-text grey-400'>{description}</p>
                    </div>

                    {/* lower-part */}
                    <div className='meal-card-data-lower'>
                        {/* categories*/}
                        <div className='meal-card-data-categories'>
                            {categories.map(category => <CategoryIcon category={category} />)}
                        </div>
                        {/* price */}
                        <div className='meal-card-data-price'>
                            <p className='body-text'>{`${price} €`}</p>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    </>
}
