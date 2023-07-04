import { useEffect, useState, useContext } from "react"
import retrieveMeals from "../logic/retrieveMeals"
import './MealCalendar.css'
import { shuffleArray } from "../logic/shuffleArray"
import saveCalendar from "../logic/saveCalendar"
import Context from "../Context"
export default function MealCalendar(){

    const [meals, setMeals] = useState()
    const { alert } = useContext(Context)



    useEffect(()=> {
      refreshCalendar()
    }, [])

    const refreshCalendar = () => {
        try{
            let _meals = retrieveMeals()
            const shuffledMeals = shuffleArray(_meals)
            
            setMeals(shuffledMeals)
        }catch(error){
            alert(error.message, 'error')
        }
    }

    const handleSaveCalendar = () => {
        try{
            saveCalendar(meals)
            alert('Your calendar has been saved!', 'success')

        } catch(error){
            alert(error.message, 'error')
        }
    }

    const handleNewCalendar = () => {
        refreshCalendar()
    }

    return <>
{meals && meals.length > 0 ? <>
<div className="table-container">
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

         <div className="meals-container">
                <div className="meal-container"><p className="meal-label">{meals[0].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[1].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[2].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[3].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[4].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[5].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[6].text}</p></div>
        </div>

        <div className="meals-container">
                <div className="meal-container"><p className="meal-label">{meals[7].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[8].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[9].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[10].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[11].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[12].text}</p></div>
                <div className="meal-container"><p className="meal-label">{meals[13].text}</p></div>
        </div>

    </div>
</div>
<div className="button-area">
        <a className="link" onClick={handleNewCalendar}>New calendar</a>
    <button className="primary-button" onClick={handleSaveCalendar}>Save calendar</button>
</div>
</> :
<>
<div className="no-meals-container">
<p className="title meme-label">We can't generate a calendar if there are no meals introduced...</p>
<img className="meme-img" src="https://res.cloudinary.com/dbn2zybcu/image/upload/v1685377570/1op1lc_xrz3ib.jpg"></img>
</div>
</>
}
</>
}