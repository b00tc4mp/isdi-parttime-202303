import { useEffect, useState, useContext } from "react"
import retrieveMeals from "../logic/retrieveMeals"
import CurrentMealCalendar from "../component/CurrentMealCalendar"
import Context from "../Context"
export default function Home({ addMeals, onMealsList }){

    const [meals, setMeals] = useState()
    const { alert } = useContext(Context)


    useEffect(()=>{
        try{
            const meals = retrieveMeals() 
            setMeals(meals)
        } catch(error){
            alert(error.message, 'error')
        }
    },[])

    const handleGoToAddMeals = () => {
        addMeals()
    }

    const handleGoToMealsList = () => {
        onMealsList()
    }

    return <div className="page-container">
            <div className='upper-part'>
                {(meals && meals.length === 0) &&
                <>
                <div className="no-meals-container">
                <div className="no-meals-container-label"><p className="title meme-label">There are no meals introduced yet...</p></div>
                <p>⬇️</p>
                </div>
                </>} 
                {(meals && meals.length > 0 && meals.length < 10) && <div className="no-meals-container">
                <div className="no-meals-container-label"><p className="title meme-label">Please introduce a minimum of 10 meals to generate a calendar</p></div>
                <p>⬇️</p>
                </div>}
            
                {(meals && meals.length >= 10 && !localStorage.currentCalendar) && <div className="no-meals-container">
                <div className="no-meals-container-label"><p className="title meme-label">No menu calendar generated yet...</p></div>
                <p>⬇️</p>
                </div>}
                {localStorage.currentCalendar && <>
                <div className="title-container">
                    <p className='title'>Current menu</p>
                </div>
                <CurrentMealCalendar />
                </> }     
        </div>

        <div className="button-area">
                    <a className="link" onClick={handleGoToAddMeals}>New meal</a>
                    {meals && <button className={`primary-button ${meals.length === 0 && 'disabled'}`} onClick={handleGoToMealsList}>Meals' list</button>}
        </div>
    </div>
} 
