import { useEffect, useState, useContext } from "react"
import '../pages/MealCalendar.css'
import './CurrentMealCalendar.css'
import retrieveSavedCalendar from "../logic/retrieveSavedCalendar"
import Context from "../Context"
export default function CurrentMealCalendar(){

    const [meals, setMeals] = useState()
    const { alert } = useContext(Context)


    useEffect(()=> {
      refreshCalendar()
    }, [])

    const refreshCalendar = () => {
        try{
            const meals = retrieveSavedCalendar()
            setMeals(meals)
        }catch(error){
            alert(error.message, 'error')
        }
    }

    return <>
<div className="table-container-home">
    <div className="titles-row">
        <p className="title-label">🗓</p>
        <p className="title-label">☀️</p>
        <p className="title-label">🌙</p>
    </div>
    <div className="weekly-container"> 

        <div className="days-container">
            <div className="day-container"><p className="day-label">L</p></div>
            <div className="day-container"><p className="day-label">M</p></div>
            <div className="day-container"><p className="day-label">X</p></div>
            <div className="day-container"><p className="day-label">J</p></div>
            <div className="day-container"><p className="day-label">V</p></div>
            <div className="day-container"><p className="day-label">S</p></div>
            <div className="day-container"><p className="day-label">D</p></div>
        </div>

       {meals && <div className="meals-container">
                <div className="meal-container"><p className="meal-label">{meals[0].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[1].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[2].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[3].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[4].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[5].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[6].text}</p></div>
        </div>}

        {meals && <div className="meals-container">
                <div className="meal-container"><p className="meal-label">{meals[7].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[8].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[9].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[10].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[11].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[12].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[13].text}</p></div>
        </div>
        }
    </div>
</div>
</>
}