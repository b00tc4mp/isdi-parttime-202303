import Context from "../Context"
import { useContext, useEffect, useState } from "react"
import Topbar from "../library/modules/Topbar"
import Tabbar from "../library/modules/Tabbar"
import NavigationRow from "../library/components/NavigationRow"
import { AdjustmentsVerticalIcon, ChevronRightIcon } from "../library/icons"
import ModalFullScreen from "../library/components/ModalFullScreen"
import AdditionalInfo from "../modals/AdditionalInfo"
import Header from "../library/components/Header"
import IconButton from "../library/components/IconButton"
import './Home.css'
import retrieveMeals from "../logic/retrieveMeals"
import MealCard from "../library/modules/MealCard"



export default function Home() {
    const { loaderOn, LoaderOff, navigate } = useContext(Context)
    const [modal, setModal] = useState<boolean>(false)
    const [meals, setMeals] = useState<Array<object>>()
    const [user, setUser] = useState<object>()

    useEffect(() => {
        try {
            retrieveMeals()
                .then(meals => {
                    setMeals(meals)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onCompleteProfile = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const onMealCard = (id: string) => {
        navigate('/meal')
    }

    type Meal = {
        images: string[],
        title: string,
        description: string,
        categories: Array<string>,
        price: string,
        id: string
    }

    return <>
        {modal && <ModalFullScreen onClose={closeModal} >
            <AdditionalInfo onModalClose={closeModal} />
        </ModalFullScreen>}
        <Topbar level={'first'} />
        <div className="page">
            <Header text={'Welcome, Lara'} />
            <NavigationRow label={"Complete your profile"} trailingIcon={<ChevronRightIcon className='icon-s primary-color' />} onClick={onCompleteProfile} container="border" />
            <div className="list-header">
                <p className="heading-s grey-700">Meals near you</p>
                <IconButton icon={<AdjustmentsVerticalIcon className="icon-s grey-700" />} type={'secondary'} />
            </div>
            <div className="meals-list">
                {meals && meals.map((meal: Meal) => {
                    return <MealCard key={meal.id} meal={{
                        image: meal.images[0],
                        title: meal.title,
                        description: meal.description,
                        categories: meal.categories ? meal.categories : [],
                        price: meal.price
                    }} onclick={() => onMealCard(meal.id)} />
                })}
            </div>
        </div>
        <Tabbar home={true} />
    </>
}