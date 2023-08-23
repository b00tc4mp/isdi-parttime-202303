import { useState, useEffect } from "react";
import Link from "../library/components/Link";
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
import useAppContext from "../logic/hooks/useAppContext";
import useHandleError from "../logic/hooks/useHandleError";
import retrievePendingToDeliver from "../logic/retrievePendingToDeliver";
import PendingToDeliverCard from '../library/modules/PendingToDeliverCard'
import EmptyState from "../library/components/EmptyState";

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


type MealOrder = {
    meal: Meal[];
    quantity: number;
}

type Order = {
    serial: string;
    meals: MealOrder[];
    buyer: User;
    status: string;
}


export default function Profile(): JSX.Element {
    const { loaderOn, loaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const [meals, setMeals] = useState<Array<Meal> | null>(null)
    const [user, setUser] = useState<User>()

    const [tabView, setTabView] = useState('myProducts')

    const [pendingToDeliverMeals, setPendingToDeliverMeals] = useState<Order[]>()

    const refreshMeals = () => {
        (async () => {
            try {
                const user = await retrieveUser()
                setUser(user)

                const meals = await retrieveOwnMeals()
                setMeals(meals)

                const pendingDeliverMeals = await retrievePendingToDeliver()
                setPendingToDeliverMeals(pendingDeliverMeals)

            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    useEffect(() => {
        refreshMeals()
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
        }, 1000)
    }

    const toggleTabView = () => {
        if (tabView === 'myProducts') setTabView('toPack')
        else setTabView('myProducts')
        refreshMeals()
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
                        label: "Meals",
                        selected: tabView === 'myProducts',
                        onClick: toggleTabView
                    },
                    {
                        label: "Pack",
                        selected: tabView === 'toPack',
                        onClick: pendingToDeliverMeals?.length === 0 ? null : toggleTabView,
                        disable: pendingToDeliverMeals?.length === 0
                    },
                    {
                        label: "Deliver",
                        selected: false,
                        onClick: null,
                        disable: true
                    }
                ]} />

                <div className="profile-meals-list">
                    {tabView === 'myProducts' && meals && meals.map((meal: Meal) => {
                        return <MealCard key={meal.id} meal={{
                            image: meal.images[0],
                            title: meal.title,
                            description: meal.description,
                            categories: meal.categories ? meal.categories : [],
                            price: meal.price
                        }} onclick={() => onMealCard(meal.id)} />
                    })}

                    {meals && meals.length === 0 && <div className="empty-state-profile"><EmptyState src="./public/illustrations/searching.gif" title="No meals created yet!" description="Add meals to start experiencing Yuper!" width="240px" /> </div>}

                    {/* PENDING TO DELIVER */}
                    {tabView === 'toPack' && pendingToDeliverMeals && pendingToDeliverMeals.map((item: Order) => {
                        return <PendingToDeliverCard buyer={item.buyer.name} meals={item.meals} serial={item.serial} chipLabel={item.status} chipStatus={item.status === 'pending' ? 'warning' : 'success'} />
                    })
                    }
                </div>
            </div>
        </div>
        <Tabbar profile={true} />
        <Link label="Log out" state="default" onClick={inLoggoutClick} />
    </>
}