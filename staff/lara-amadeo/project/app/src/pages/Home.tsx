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
    const { loaderOn, LoaderOff } = useContext(Context)
    const [modal, setModal] = useState<boolean>(false)
    const [meals, setMeals] = useState<Array<object>>()

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
                {meals && meals.map(meal => {
                    return <MealCard image={meal.images[0]} title={meal.title} description={meal.description} categories={meal.category ? meal.category : []} price={meal.price} />
                })}
            </div>
        </div>
        <Tabbar home={true} />
    </>
}