//import { Form, ButtonForm, Container } from "../library"

import { Text, View, Image, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react"
import { authenticateUser } from "../logic/authenticateUser.js"

const Login = ({ onRegisterClick, onUserLogedIn, onAdminLogedIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = () => {
        if (email === process.env.ADMIN && password === process.env.ADMIN_PASS) {
            onAdminLogedIn()
        } else {
            try {
                authenticateUser(email, password)
                    .then(() => {
                        onUserLogedIn()})
                    .catch(error => {
                        alert('Error', error.message)})
            } catch (error) {
                alert('Error', error)
            }
        }
    }

    // afegir compos personalitzats com el container, form, button, etc... '../library'
    return <View className="flex justify-center items-center h-screen w-screen">
        <Image source={require('../../assets/login-register/log-reg-bg.jpg')} className="absolute scale-75 -bottom-40 -right-40" ></Image>
        <View className="bg-neutral-500 rounded-3xl opacity-70 w-80 h-4/5 absolute shadow-md shadow-black"></View>
        <View className="rounded-3xl w-80 h-4/5 flex justify-center items-center">
            <View className="flex justify-center items-center w-80 h-1/3">
                <Image source={require('../../assets/generic/logo-face.png')} className="h-40 w-40" />
                <Text className="absolute -bottom-4 text-5xl font-semibold shadow-md shadow-orange-500" >Login</Text>
            </View>
            <View className="w-80 h-2/3 flex justify-between p-5 items-center ">
                <View className="flex justify-around items-center w-80 h-2/4">
                    <View className="flex justify-around items-center w-80 h-1/2">
                        <TextInput className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
                            placeholder="email" onChangeText={newEmail => (setEmail(newEmail))} />
                        <TextInput className="w-60 h-8 bg-white rounded-md shadow-md shadow-black"
                            secureTextEntry={true}
                            placeholder="password"
                            onChangeText={newPassword => (setPassword(newPassword))}
                        />
                    </View>
                    <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleLogin}>
                        <Text className=" opacity-100 text-xl">Login!</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity className="w-80 flex items-center" onPress={handleRegisterClick}>
                    <Text className="text-xl text-white">New? Register here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

export default Login