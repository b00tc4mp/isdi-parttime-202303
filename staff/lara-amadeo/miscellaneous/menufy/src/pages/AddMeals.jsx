import { useEffect, useState, useContext } from 'react'
import addMeal from '../logic/addMeal'
import './AddMeals.css'
import { deleteMeal } from '../logic/deleteMeal'
import MealElementList from '../component/MealElementList'
import retrieveMeals from '../logic/retrieveMeals'
import Context from '../Context'


export default function AddMeals({ onDone }){

    const [meals, setMeals] = useState([])
    const { alert } = useContext(Context)


    useEffect(()=> {
       const meals =  retrieveMeals()
        setMeals(meals)
    },[])

    const handleAddMeal = (event) => {
        event.preventDefault()

        const meal = event.target.meal.value

        try{
            const _meals = addMeal(meal)
            setMeals(_meals)
            event.target.meal.value = ''
        } catch(error){
            alert(error.message, 'error')
        }
    }

    const handleDeleteMeal = (id) => {
        try{
            const _meals = deleteMeal(id)
            setMeals(_meals)
        } catch(error){
            alert(error.message, 'error')
        }
    } 

    const handleDoneList = () => {
        onDone()
    }

    return <div className="page-container">
    <div className='upper-part-add-meals'>

            <form className='form-add-meals' onSubmit={handleAddMeal}>

                <div className='text-input'>
                <label className="text-field-label" htmlFor="meal">Introduce your meals</label>
                <input name='meal' className="text-field"></input>
                </div>

                <button type='submit' className='secondary-button add-button'>Add</button>
            </form>

    </div>

    <div className='lower-part-add-meals'>
         <p className='body-text'>Meals' list - {meals.length} items</p>
         {meals === 'empty' && <p className='body-text-regular'>Nothing here yet... Add your first meal!</p>}
         <ul className='list'> {meals && meals.map(meal => 
            <MealElementList meal={meal} onDelete={handleDeleteMeal} view={'e'}/>)
         } </ul>
    </div>
    <div className='button-area'>
    <button className='primary-button' onClick={handleDoneList}>Done</button>
    </div>
</div>
}