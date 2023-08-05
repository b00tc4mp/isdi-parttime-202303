import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Home from '../screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default class BottomTab extends Component {
    render() {
        return (<>
            {/* <SafeAreaView> */}
            <Tab.Navigator
                initialRouteName="Home"
                options={{ presentation: 'transparent' }}
                labeled={false}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { margin: 0, padding: 0, height: 50, backgroundColor: '#ff6600', position: 'absolute', bottom: 30, width: '84%', left: '8%', borderRadius: '100%' },
                    tabBarShowLabel: false,
                }}
                safeAreaInsets={{ bottom: 0 }}
            >
                <Tab.Screen labeled={false} name="HomeScreen" component={Home} />
                <Tab.Screen name="HomeScreen2" component={Home} />
            </Tab.Navigator>
            {/* </SafeAreaView> */}
        </>
        )
    }
}
