import { useEffect, useState } from 'react'
import './MealDetails.css'
import Header from '../library/components/Header'
import CategoryInteractive from '../library/components/CategoryInteractive'
import IconButton from '../library/components/IconButton'
import { ArrowLeftIcon, ArrowRightIcon, EllipsisVerticalIcon, MinusIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '../library/icons'
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
import useAppContext from '../logic/hooks/useAppContext'
import useHandleError from '../logic/hooks/useHandleError'


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

    const { loaderOff, loaderOn, navigate, toast } = useAppContext()
    const handleErrors = useHandleError()

    const [meal, setMeal] = useState<Meal>()
    const { mealId } = useParams<string>()

    const [contextualModal, setContextualModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const [openCategory, setOpenCategory] = useState<string>("")
    const userId = getUserId()

    const location = useLocation()
    const from = location.state

    const [current, setCurrent] = useState(0);
    const [length, setLength] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const meal = await retrieveMeal(mealId!)
                setMeal(meal)

                setLength(meal.images.length)
            } catch (error: any) {
                handleErrors(error)
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

    const saveEdit = () => {
        setEditModal(false)
        toast('Meal updated!', 'success')
    }

    const openDeleteModal = () => {
        setDeleteModal(true)
        setContextualModal(false)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
        setContextualModal(false)
    }

    const saveDelete = () => {
        loaderOn()
        setTimeout(() => {
            navigate("/profile")
            loaderOff()
            toast('Meal deleted!', 'success')
        }, 800);
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    return <>
        {deleteModal && <DeleteModal mealId={mealId!} handleClose={closeDeleteModal} onDelete={saveDelete} />}
        {editModal && <EditMeal mealId={mealId!} onUpdateMeal={saveEdit} onCancelEditMeal={closeEditModal} />}
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
        <Topbar level='second' secondLevel={{ label: "Meal detail", left: <ArrowLeftIcon className='icon-s grey-700' />, onLeftClick: onBackClick, right: <EllipsisVerticalIcon className='icon-s grey-700' />, onRightClick: onOptionsClick }} />
        <div className='page-first-level' style={{ overflow: contextualModal ? 'hidden' : 'auto', paddingBottom: meal?.author.id !== userId ? '90px' : '0px' }}>

            {/* upper-part */}
            <div className='meal-detail-upper-part'>
                {meal && <section className='slider'>
                    <IconButton type={'primary'} icon={<ArrowLeftIcon className='icon-s grey-700' />} onClick={prevSlide} className={"slider-left-icon"} />
                    <IconButton type={'primary'} icon={<ArrowRightIcon className='icon-s grey-700' />} onClick={nextSlide} className={"slider-right-icon"} />
                    {meal.images.map((slide, index) => {
                        return (
                            <div className={index === current ? 'slide active' : 'slide'} key={index}>
                                {index === current && (<img src={slide} alt='travel image' className='meal-detail-img' />)}
                            </div>
                        )
                    })}
                </section>}
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
                        </> : ""}
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