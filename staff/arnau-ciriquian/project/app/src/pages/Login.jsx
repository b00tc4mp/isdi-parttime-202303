//import { authenticateUser } from "../logic/authenticateUser"
//import "./login.css"
//import { Form, ButtonForm, Container } from "../library"

import { Text, View, Image, Button } from "react-native"

export default function Login({onRegisterClick}) {

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    // afegir compos personalitzats com el container, form, button, etc... '../library'
    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image source={require('../../assets/login/DreamShaper_v6_SCIFI_Fantasy_World_a_small_town_near_an_oasis_1.jpg')} style={{ position: 'absolute', height: '100%', left: -120 }}></Image>
        <View style={{
            width: 300,
            height: 500,
            backgroundColor: '#f2A337',
            opacity: 0.7,
            borderRadius: 20,
            justifyContent: "space-around",
            alignItems: 'center',
            shadowColor: '#171717',
            shadowOffset: { width: 4, height: 5},
            shadowOpacity: 0.8
        }}>
            <Image source={require('../../assets/login/slashing-sword.png')} style={{ height: 80, width: 80 }} />
            <Text >Login page</Text>
            <Button
                onPress={handleRegisterClick}
                title="Register here!"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    </View>
}