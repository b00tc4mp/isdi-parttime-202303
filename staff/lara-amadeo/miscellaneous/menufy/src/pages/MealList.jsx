import { useEffect, useState, useContext } from "react"
import retrieveMeals from "../logic/retrieveMeals"
import { deleteMeal } from "../logic/deleteMeal"
import MealElementList from "../component/MealElementList"
import './MealList.css'
import Context from "../Context"

export default function MealList({ onGenerate }){

    const [meals, setMeals] = useState([])
    const { alert } = useContext(Context)

    useEffect(()=> {
        refreshMeals()
    }, [])

    const refreshMeals = () => {
        try{
            const _meals = retrieveMeals()
            setMeals(_meals)
        } catch(error){
            alert(error.message, 'error')
        }
    }

    const handleDeleteMeal = (id) => {
        try{
            const _meals = deleteMeal(id)
            refreshMeals()
        } catch(error){
            alert(error.message, 'error')
        }
    }

    const handleGenerateMenu = () => {
        if(meals.length < 10){
            alert('You must introduce a minimum of 10 meals to have a varied diet!', 'error')
            return
        }
        onGenerate()
    }
    return <div className="page-container">
    <div className='meals-list-container'>
         <p className='body-text'>Meals' list - {meals.length} items</p>
         {meals === 'empty' && <p className='body-text-regular'>Nothing here yet... Add your first meal!</p>}
         <ul className='list-r'> {meals && meals.map(meal => 
            <MealElementList meal={meal} onDelete={handleDeleteMeal} view={'r'}/>)
         } </ul>
    </div>
    <div className='button-area'>
    <button className='primary-button' onClick={handleGenerateMenu}>Generate menu</button>
    </div>
</div>
}