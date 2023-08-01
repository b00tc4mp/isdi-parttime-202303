import { useContext, useEffect, useState } from 'react'
import ModalFullScreen from '../library/components/ModalFullScreen'
import './MealDetails.css'
import Context from '../Context'
import Header from '../library/components/Header'
import CategoryInteractive from '../library/components/CategoryInteractive'
import IconButton from '../library/components/IconButton'
import { EllipsisVerticalIcon, MinusIcon, PencilIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '../library/icons'
import DataItem from '../library/components/DataItem'
import ChefModule from '../library/modules/ChefModule'
import ButtonBar from '../library/modules/ButtonBar'
import { useParams } from 'react-router-dom'
import retrieveMeal from '../logic/retrieveMeal'
import getUserId from '../logic/getUserId'
import ContextualModalMenu from '../library/modules/ContextualModalMenu'
import Link from '../library/components/Link'

type Meal = {
    author: { avatar: string, name: string, description: string, id: string },
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
    const { mealId } = useParams<string>()

    const [openCategory, setOpenCategory] = useState<string>("")
    const userId = getUserId()

    useEffect(() => {
        (async () => {
            try {
                const meal = await retrieveMeal(mealId!)
                setMeal(meal)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])

    const onCloseClick = () => {
        navigate(-1)
    }

    const onNewChatClick = (event: React.SyntheticEvent) => {

    }

    const toggleOpenCategory = (category: string) => {
        setOpenCategory(category !== openCategory ? category : "")
    }

    return <>
        <ContextualModalMenu>
            <>
                <Link label='Edit meal' state='default' icon={<PencilSquareIcon className='icon-xs grey-700' />} />
                <Link label='Mark as out of stock' state='default' icon={<XMarkIcon className='icon-xs grey-700' />} />
                <Link label='Delete meal' state='critical' icon={<TrashIcon className='icon-xs critical-color' />} />
            </>
        </ContextualModalMenu>
        <ModalFullScreen onClose={onCloseClick} topBarLabel='Meal details'>
            <div className='page-button-bar'>

                {/* upper-part */}
                <div className='meal-detail-upper-part'>
                    {meal && <img className='meal-detail-img' src={meal.images[0]}></img>}
                    {/* image-info */}
                    <div className='meal-detail-img-info'>

                        {/* categories */}
                        <div className='meal-detail-img-info-categ'>
                            {meal && meal.categories.length > 0 && meal.categories.map((category: string) => <CategoryInteractive category={category} open={category === openCategory} onClick={() => toggleOpenCategory(category)} />)}
                        </div>

                        {/* counter - actionButton */}
                        <div className='meal-detail-img-info-counter'>
                            {meal?.author.id !== userId ? <>
                                <IconButton icon={<MinusIcon className='icon-s grey-700' />} type={'secondary'} />
                                <p className='heading-l'>1</p>
                                <IconButton icon={<PlusIcon className='icon-s grey-700' />} type={'secondary'} />
                            </> :
                                <>
                                    <IconButton icon={<EllipsisVerticalIcon className='icon-s grey-700' />} type={'primary'} />
                                </>}

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
        {meal?.author.id !== userId && <ButtonBar firstButton={{ label: 'New chat', onClick: onNewChatClick }} />}
    </>
}