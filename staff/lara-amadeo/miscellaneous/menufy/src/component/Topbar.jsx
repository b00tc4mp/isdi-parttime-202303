import { useState, useContext } from 'react'
import './Topbar.css'
import retrieveMeals from '../logic/retrieveMeals'
import Context from '../Context'
export default function Topbar({ onHome, onAdd, onCalendar }){

    const [meals, setMeals] = useState()
    const { alert } = useContext(Context)


    const handleGoToHome = () => {
        onHome()
    }

    const handleGoToGenerateCalendar = () => {
        try{
            const meals = retrieveMeals()
            if(meals.length < 10){
                alert('You must introduce a minimum of 10 meals to have a varied diet!', 'error')
                return
            }
            setMeals(meals)
            onCalendar()
        } catch(error){
            alert(error.message, 'error')
        }
    }

    const handleGoToAddMeal = () => {
        onAdd()
    }

    return <div className="topbar-container">
    <div className="topbar-left-side">
        <div className="avatar-icon-m-container" onClick={handleGoToHome}><span className="material-symbols-rounded icon-s topbar">home</span></div>

        <p className='body-text'>Menufy</p>
    </div>
    <div className="topbar-right-side">
        <div onClick={handleGoToAddMeal} className="avatar-icon-m-container"><span className="material-symbols-rounded icon-s topbar">add</span></div>
        <div onClick={handleGoToGenerateCalendar} className="avatar-icon-m-container"><span className="material-symbols-rounded icon-s topbar">calendar_month</span></div>

    </div>
</div>
}