
module.exports = {
    registerUser: require('./registerUser'),
    authenticateUser: require('./authenticateUser'),
    registerAdditionalInfo: require('./registerAdditionalInfo'),
    createMeal: require('./createMeal'),
    retrieveMeals: require('./retrieveMeals'),
    retrieveUser: require('./retrieveUser'),
    retrieveMeal: require('./retrieveMeal'),
    retrieveOwnMeals: require('./retrieveOwnMeals'),
    updateMeal: require('./updateMeal'),
    deleteMeal: require('./deleteMeal'),
    addMealToCart: require('./addMealToCart'),
    retrieveCartMeals: require('./retrieveCartMeals'),
    payMealsInCart: require('./payMealsInCart.js'),
    removeMealFromCart: require('./removeMealFromCart'),
    retrievePendingToPickUp: require('./retrievePendingToPickUp'),
    incrementMealsInCart: require('./incrementMealsInCart'),
    retrievePendingToDeliver: require('./retrievePendingToDeliver'),
    markAsReady: require('./markAsReady'),
    retrieveWaitingClientToPickUp: require('./retrieveWaitingClientToPickUp'),
    markAsCompleted: require('./markAsCompleted'),
    searchMeals: require('./searchMeals')
}