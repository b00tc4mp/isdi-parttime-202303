import React, { useEffect, useState, useContext } from "react";

import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Context from '../AppContext.js'
import MapView, { Marker, Callout } from 'react-native-maps'
import registerUser from '../logic/users/registerUser.js'

import BG from '../../assets/bg-login.png'
import LOGO_SM from '../../assets/logo-sm.png'
import LOGO from '../../assets/logo.png'
export default function Login({ navigation }) {
    const { currentView, setCurrentView, colorScheme } = useContext(Context)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
    const handleRegister = () => {

        registerUser(name, email, password)
            .then(token => {
                alert('New user registered! \n Now you can login.')
                navigation.navigate('Login')

            })
            .catch(error => alert(error.message))
    }
    const handleForgetPassword = () => {
        alert('TODO Forget Password')
    }
    const handleGoToLogin = () => {
        navigation.navigate('Login')
    }

    return <>
        <View className="flex-1 items-center justify-center w-full">
            <Image className="w-full h-screen top-0 absolute" source={BG} />

            <View className="flex-1 items-center justify-center w-full">
                <View className="bg-white dark:bg-gray-800 h-auto px-6 py-7 w-3/4 rounded-3xl">
                    <Text className="dark:text-white text-2xl text-center font-semibold">Register</Text>
                    <Text className="dark:text-white pt-4 text-xs text-center">Your name</Text>
                    <TextInput
                        label="Name"
                        returnKeyType="next"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Name"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-2 py-2 self-center w-full text-center"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <Text className="dark:text-white pt-4 text-xs text-center">Your email</Text>
                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Email"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-2 py-2 self-center w-full text-center"
                        inputMode="text"
                        keyboardType="email-address"
                    />
                    <Text className="dark:text-white pt-3 text-xs text-center">Your Password</Text>
                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="Password"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full my-1 px-2 py-2 self-center w-full text-center"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <Text className="dark:text-white pt-3 text-xs text-center">Repeat your Password</Text>
                    <TextInput
                        label="Repeat password"
                        returnKeyType="done"
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        secureTextEntry
                        placeholder="Repeat password"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full my-1 px-2 py-2 self-center w-full text-center"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="border border-mainLime bg-mainLime rounded-full mb-1 mt-4 self-center w-auto  text-center"
                        onPress={handleRegister}
                    >
                        <View
                            className="font-bold text-center  px-6 py-2 self-center rounded-full"
                        >
                            <Text className="font-bold text-center text-lg   self-center rounded-full">Create account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mb-2 self-center w-full text-center"
                        activeOpacity={1}
                        onPress={handleGoToLogin}
                    >
                        <Text
                            className="dark:text-white mt-3 text-xs text-center" >
                            Already registered?
                            <Text className="font-bold">Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </>
}