import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState, useContext } from 'react'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'


const Stack = createNativeStackNavigator()
export default function MainStack() {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const { TOKEN, setTOKEN } = useContext(Context)

    useEffect(() => {
        AsyncStorage.getItem('TOKEN')
            .then(token => {
                // alert(token)
                if (token) {
                    setTOKEN(token)
                    setIsLoggedIn(true)
                }
            })
    }, [])

    return (<>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }} >

            {isLoggedIn && <Stack.Screen
                name='Home'
                component={Home}
            />}
            {!isLoggedIn && <><Stack.Screen
                name='Login'
                component={Login}
            />
                <Stack.Screen
                    name='Register'
                    component={Register}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                /></>}

        </Stack.Navigator>
    </>
    )

}
