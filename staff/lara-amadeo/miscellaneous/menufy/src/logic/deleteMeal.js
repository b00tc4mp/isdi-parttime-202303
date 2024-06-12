import { meals, saveMealsInStorage } from "../data";

export function deleteMeal(id){

    const _meals = meals()

    const index = _meals.findIndex(_meal => _meal.id === id)

    _meals.splice(index, 1)

    saveMealsInStorage(_meals)

    return _meals
}