import { useContext, useEffect, useState } from 'react'
import ModalFullScreen from '../library/components/ModalFullScreen'
import './MealDetails.css'
import Context from '../Context'
import Header from '../library/components/Header'
import CategoryInteractive from '../library/components/CategoryInteractive'
import IconButton from '../library/components/IconButton'
import { MinusIcon, PlusIcon } from '../library/icons'
import DataItem from '../library/components/DataItem'
import ChefModule from '../library/modules/ChefModule'
import ButtonBar from '../library/modules/ButtonBar'
import { useParams } from 'react-router-dom'
import retrieveMeal from '../logic/retrieveMeal'

type Meal = {
    author: { avatar: string, name: string, description: string },
    images: Array<string>,
    title: string,
    description: string,
    ingredients: string,
    bestBefore: string,
    price: string,
    categories: Array<string>
}

export default function MealDetails(): JSX.Element {

    const { loaderOff, loaderOn, navigate } = useContext(Context)
    const [meal, setMeal] = useState<Meal>()
    const { mealId } = useParams()

    useEffect(() => {
        try {
            if (mealId !== undefined) {
                retrieveMeal(mealId)
                    .then(meal => setMeal(meal))
                    .catch((error: string) => {
                        console.log(error)
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onCloseClick = () => {
        navigate('/')
    }

    const onNewChatClick = (event: React.SyntheticEvent) => {

    }

    return <>
        <ModalFullScreen onClose={onCloseClick} topBarLabel='Meal details'>
            <div className='page-button-bar'>

                {/* upper-part */}
                <div className='meal-detail-upper-part'>
                    {meal && <img className='meal-detail-img' src={meal.images[0]}></img>}
                    {/* image-info */}
                    <div className='meal-detail-img-info'>
                        {/* categories */}
                        <div className='meal-detail-img-info-categ'>
                            {meal && meal.categories.length > 0 && meal.categories.map((category: string) => <CategoryInteractive category={category} />)}
                        </div>
                        {/* counter */}
                        <div className='meal-detail-img-info-counter'>
                            <IconButton icon={<MinusIcon className='icon-s grey-700' />} type={'secondary'} />
                            <p className='heading-l'>1</p>
                            <IconButton icon={<PlusIcon className='icon-s grey-700' />} type={'secondary'} />
                        </div>
                    </div>
                </div>

                {/* lower-part */}
                {meal && <Header text={meal.title} />}
                <div className='meal-detail-lower-part'>
                    {meal && <DataItem label='Description' content={meal.description} />}
                    {meal && <DataItem label='Ingredients' content={meal.ingredients} />}
                    {meal && <DataItem label='BestBefore' content={`${meal.bestBefore} days`} />}
                    {meal && <DataItem label='Price' content={`${meal.price}€`} />}
                    {meal && <ChefModule avatar={meal.author.avatar} name={meal.author.name} description={meal.author.description} liked={true} />}
                </div>
            </div>
        </ModalFullScreen>
        <ButtonBar firstButton={{ label: 'New chat', onClick: onNewChatClick }} />
    </>
}