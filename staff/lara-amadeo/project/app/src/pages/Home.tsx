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
import retrieveUser from "../logic/retrieveUser"

type User = {
    name: string,
    availability: Array<object>
}

type Meal = {
    images: string[],
    title: string,
    description: string,
    categories: Array<string>,
    price: string,
    id: string
}

export default function Home() {
    const { loaderOn, LoaderOff, navigate } = useContext(Context)
    const [meals, setMeals] = useState<Array<Meal>>()
    const [user, setUser] = useState<User>()

    useEffect(() => {
        (async () => {
            try {
                const meals = await retrieveMeals()
                const user = await retrieveUser()
                setMeals(meals)
                setUser(user)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const onCompleteProfile = () => {
        navigate('additionalInfo')
    }

    const onMealCard = (id: string) => {
        navigate(`/meal/${id}`)
    }

    return <>
        <Topbar level={'first'} />
        <div className="page-first-level">
            {user && <Header text={`Welcome, ${user.name}`} />}
            {user && user.availability.length === 0 && <NavigationRow className="home-navigation-row" label={"Complete your profile"} trailingIcon={<ChevronRightIcon className='icon-s primary-color' />} onClick={onCompleteProfile} container="border" />}
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