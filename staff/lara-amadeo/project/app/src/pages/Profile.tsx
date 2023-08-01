import { useContext, useState, useEffect } from "react";
import Link from "../library/components/Link";
import Context from "../Context";
import logoutUser from "../logic/logoutUser";
import './Profile.css'
import Topbar from "../library/modules/Topbar";
import Tabbar from "../library/modules/Tabbar";
import Avatar from "../library/components/Avatar";
import { ChevronRightIcon, Cog6ToothIcon, CubeIcon, HeartIcon, UserIcon } from "../library/icons";
import Divider from "../library/components/Divider";
import Tabs from "../library/components/Tabs";
import retrieveUser from "../logic/retrieveUser";
import MealCard from "../library/modules/MealCard";
import retrieveOwnMeals from "../logic/retrieveOwnMeals";

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
}

type Meal = {
    images: string[],
    title: string,
    description: string,
    categories: Array<string>,
    price: string,
    id: string
}


export default function Profile(): JSX.Element {
    const { loaderOn, loaderOff, navigate } = useContext(Context)
    const [meals, setMeals] = useState<Array<Meal>>([])
    const [user, setUser] = useState<User>()

    useEffect(() => {
        (async () => {
            try {
                const meals = await retrieveOwnMeals()
                const user = await retrieveUser()
                setMeals(meals)
                setUser(user)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const onMealCard = (id: string) => {
        const currentPath = window.location.pathname
        navigate(`/meal/${id}`, { state: currentPath })
    }

    const inLoggoutClick = () => {
        loaderOn()
        setTimeout(() => {
            logoutUser()
            loaderOff()
            navigate('/login')
        }, 1000);
    }

    const toggleTabView = () => {

    }

    return <>
        <Topbar level={'first'} />
        <div className="page-first-level">
            <div className="profile-first-part">
                {user && <Avatar image={user.avatar} width={"60px"} />}
                {user && <div className="profile-info">
                    <p className="tiny-text grey-400">{user.username}</p>
                    <p className="title gre-700">{user.name}</p>
                    <p className="tiny-text grey-400">{user.description}</p>
                    <p className="tiny-text grey-400 italic">{user.tags}</p>
                </div>}
            </div>
            <div className="profile-second-part">

                <div className="profile-opt">
                    <div className="profile-opt-label">
                        <HeartIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">My favourites</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt">
                    <div className="profile-opt-label">
                        <CubeIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">Past orders</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt">
                    <div className="profile-opt-label">
                        <UserIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">My account</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>
                <Divider width="100%" />

                <div className="profile-opt">
                    <div className="profile-opt-label">
                        <Cog6ToothIcon className="icon-xs grey-700" />
                        <p className="body-text grey-700">Settings</p>
                    </div>
                    <ChevronRightIcon className="icon-xs grey-700" />
                </div>

            </div>
            <div className="profile-third-part">
                <Tabs items={[
                    {
                        label: "My products",
                        selected: true,
                        onClick: toggleTabView
                    },
                    {
                        label: "To deliver",
                        selected: false,
                        onClick: toggleTabView
                    }
                ]} />

                <div className="profile-meals-list">
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
        </div>
        <Tabbar profile={true} />
        <Link label="Log out" state="default" onClick={inLoggoutClick} />
    </>
}