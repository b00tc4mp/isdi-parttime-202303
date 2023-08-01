import { useContext, useEffect, useState } from 'react'
import './MealDetails.css'
import Context from '../Context'
import Header from '../library/components/Header'
import CategoryInteractive from '../library/components/CategoryInteractive'
import IconButton from '../library/components/IconButton'
import { EllipsisVerticalIcon, MinusIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '../library/icons'
import DataItem from '../library/components/DataItem'
import ChefModule from '../library/modules/ChefModule'
import ButtonBar from '../library/modules/ButtonBar'
import { useParams, useLocation } from 'react-router-dom'
import retrieveMeal from '../logic/retrieveMeal'
import getUserId from '../logic/getUserId'
import ContextualModalMenu from '../library/modules/ContextualModalMenu'
import Link from '../library/components/Link'
import Topbar from '../library/modules/Topbar'
import EditMeal from '../modals/EditMeal'
import DeleteModal from '../modals/DeleteModal'

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

    const [contextualModal, setContextualModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const [openCategory, setOpenCategory] = useState<string>("")
    const userId = getUserId()

    const location = useLocation()
    const from = location.state

    useEffect(() => {
        (async () => {
            try {
                const meal = await retrieveMeal(mealId!)
                setMeal(meal)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [editModal])

    const onBackClick = () => {
        navigate(from)
    }

    const onNewChatClick = (event: React.SyntheticEvent) => {

    }

    const toggleOpenCategory = (category: string) => {
        setOpenCategory(category !== openCategory ? category : "")
    }

    const onOptionsClick = () => {
        setContextualModal(true)
    }

    const closeContextualMenu = () => {
        setContextualModal(false)
    }

    const openEditModal = () => {
        setEditModal(true)
        setContextualModal(false)
    }

    const closeEditModal = () => {
        setEditModal(false)
    }

    const openDeleteModal = () => {
        setDeleteModal(true)
        setContextualModal(false)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
        setContextualModal(false)
    }

    const onDeletion = () => {
        loaderOn()
        setTimeout(() => {
            navigate("/profile")
            loaderOff()
        }, 800);
    }

    return <>
        {deleteModal && <DeleteModal mealId={mealId!} handleClose={closeDeleteModal} handleGoToProfile={onDeletion} />}
        {editModal && <EditMeal mealId={mealId!} onUpdateMeal={closeEditModal} />}
        {contextualModal && <>
            <div className='contextualModal-overlay' onClick={closeContextualMenu}></div>
            <ContextualModalMenu >
                <>
                    <Link label='Edit meal' state='default' icon={<PencilSquareIcon className='icon-xs grey-700' />} onClick={openEditModal} />
                    <Link label='Mark as out of stock' state='default' icon={<XMarkIcon className='icon-xs grey-700' />} />
                    <Link label='Delete meal' state='critical' icon={<TrashIcon className='icon-xs critical-color' />} onClick={openDeleteModal} />
                </>
            </ContextualModalMenu>
        </>}
        <Topbar level='second' secondLevel={{ label: "Meal detail", back: true, onBackClick: onBackClick }} />
        <div className='page-first-level' style={{ overflow: contextualModal ? 'hidden' : 'auto' }}>

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
                                <IconButton icon={<EllipsisVerticalIcon className='icon-s grey-700' />} type={'primary'} onClick={onOptionsClick} />
                            </>}

                    </div>


                </div>
            </div>

            {/* lower-part */}
            {meal && <Header text={meal.title} />}
            <div className='meal-detail-lower-part'>
                {meal && <DataItem label='Description' content={meal.description} />}
                {/* @ts-ignore */}
                {meal && <DataItem label='Ingredients' content={meal.ingredients.join(", ")} />}
                {meal && <DataItem label='BestBefore' content={`${meal.bestBefore} days`} />}
                {meal && <DataItem label='Price' content={`${meal.price}€`} />}
                {meal && <ChefModule avatar={meal.author.avatar} name={meal.author.name} description={meal.author.description} liked={true} />}
            </div>
        </div>
        {meal?.author.id !== userId && <ButtonBar firstButton={{ label: 'New chat', onClick: onNewChatClick }} />}
    </>
}