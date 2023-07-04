export const meals = () => "mealsJSON" in localStorage? JSON.parse(localStorage.mealsJSON) : []

export function saveMealsInStorage(meals) {
    
    localStorage.mealsJSON = JSON.stringify(meals)
}

export const contextMeals = localStorage