import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()
export default function MainStack() {

    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false,
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
            />
        </Stack.Navigator>

    )

}
