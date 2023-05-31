import { meals, saveMealsInStorage } from "../data"

export default function addMeal(meal){

    const _meals = meals()

    let newMeal
           if(_meals.length === 0) {
               newMeal = {
                   id: 'meal-1',
                   text: meal,
               }

               _meals.push(newMeal)
               
               saveMealsInStorage(_meals)
           
               return _meals

           } else {
                const repeated = _meals.includes(_meal => _meal.text.toLowerCase() === meal.text.toLowerCase())

                if(repeated) throw new Error('Meal already included')

               const lastMealId = _meals[_meals.length - 1].id
               const newMealId = 'meal-' + (Number((lastMealId).slice(5)) + 1)
           
               newMeal = {
                   id: newMealId,
                   text: meal,
               }

               _meals.push(newMeal)

               saveMealsInStorage(_meals)
           
               return _meals
            }




    
    


}

