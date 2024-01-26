import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CLOSE } from '../../../assets/icons';
import Context from '../../AppContext.js'

import retrieveUser from "../../logic/users/retrieveUser";
import { validateEmail, validatePassword, validateName } from "../../../com/validators.js";
import { updateUserEmail } from "../../logic/users/updateUserEmail";
import { updateUserName } from "../../logic/users/updateUserName";
import { updateUserPassword } from "../../logic/users/updateUserPassword";
// import { updateUserEmail, updateUserName, updateUserPassword } from "../../logic/";


export default function UserSettings({ closeHandle, handleMarkerPressedHandler }) {
    const { currentView, setCurrentView, TOKEN } = useContext(Context)
    // const { currentMarker, setCurrentMarker } = useContext(Context)
    const [animation, setAnimation] = useState('fadeInUp')
    const [user, setUser] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()



    useEffect(() => {
        retrieveUser(TOKEN)
            .then(user => {
                setUser(user)
            })
    }, []);
    useEffect(() => {
    }, [name, email, password, user]);
    const handleSaveUser = () => {
        try {
            if (name) {
                validateName(name)
                updateUserName(TOKEN, name)
                    .then(() => {
                        Alert.alert('Success', `${'Your name was updated!'}`, [
                            { text: 'OK', onPress: () => { } },
                        ])
                        retrieveUser(TOKEN)
                            .then(user => {
                                setUser(user)
                            })
                        setName()
                    })
            }
            if (email) {
                validateEmail(email)
                updateUserEmail(TOKEN, email)
                    .then(() => {
                        Alert.alert('Success', `${'Your email was updated!'}`, [
                            { text: 'OK', onPress: () => { } },
                        ])
                        retrieveUser(TOKEN)
                            .then(user => {
                                setUser(user)
                            })
                        setEmail()
                    })
                    .catch(error =>
                        Alert.alert('Error', `${error.message}`, [
                            { text: 'OK', onPress: () => { } },
                        ])
                    )
            }
        } catch (error) {
            Alert.alert('Error', `${error.message}`, [
                { text: 'OK', onPress: () => { } },
            ]);
        }
    }
    const handleSavePassword = () => {
        try {
            validatePassword(password)
            validatePassword(repeatPassword)
            updateUserPassword(TOKEN, password, repeatPassword)
                .then(() => {
                    Alert.alert('Success', `${'Your password me was updated!'}`, [
                        { text: 'OK', onPress: () => { } },
                    ])
                    retrieveUser(TOKEN)
                        .then(user => {
                            setUser(user)
                        })
                    setPassword()
                    setRepeatPassword()
                })
                .catch(error =>
                    Alert.alert('Error', `${error.message}`, [
                        { text: 'OK', onPress: () => { } },
                    ])
                )
        } catch (error) {
            Alert.alert('Error', `${error.message}`, [
                { text: 'OK', onPress: () => { } },
            ]);
        }
    }

    return <>
        {user &&
            <View className="w-full p-5  pt-1 bg-red-s400" >
                <View className="">
                    <Text className=" font-bold text-2xl mt-2">My account</Text>
                </View>

                <View className="" >
                    <Text className="dark:text-white mt-2 text-lg  font-semibold">Edit profile</Text>
                    <Text className="dark:text-white mt-2 text-xs">Your name</Text>
                    <TextInput
                        label="Name"
                        returnKeyType="next"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder={user.name}
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-3 py-2 self-start w-full"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <Text className="dark:text-white pt-4 text-xs ">Your email</Text>
                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder={user.email}
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full mt-1 mb-0 px-3 py-2 self-start w-full "
                        inputMode="text"
                        keyboardType="email-address"
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="border border-mainLime bg-mainLime rounded-full mb-1 mt-4 self-start w-auto  "
                        onPress={() => {
                            handleSaveUser()
                        }} >
                        <View className="font-bold   px-6 py-1.5 self-start rounded-full" >
                            <Text className="font-bold  text-lg   self-start rounded-full">Update</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View className="" >
                    <Text className="dark:text-white mt-5 text-lg font-semibold">Edit password</Text>
                    <Text className="dark:text-white mt-2 text-xs ">Your email</Text>
                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="Password"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full my-1 px-3 py-2 self-start w-full"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <Text className="dark:text-white pt-3 text-xs">Repeat password</Text>
                    <TextInput
                        label="Repeat password"
                        returnKeyType="done"
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        secureTextEntry
                        placeholder="Repeat password"
                        className="dark:text-white border border-mainGray bg-mainGray dark:border-gray-700 dark:bg-gray-700 rounded-full my-1 px-3 py-2 self-start w-full"
                        inputMode="text"
                        keyboardType="default"
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="border border-mainLime bg-mainLime rounded-full mb-1 mt-4 self-start w-auto  "
                        onPress={() => {
                            handleSavePassword()
                        }} >
                        <View className="font-bold   px-6 py-1.5 rounded-full" >
                            <Text className="font-bold  text-lg   self-start rounded-full">Update</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        }








        {/* <Modal
            animationType="slide"
            transparent={true}
            className="w-full justify-center flex content-center center h-auto max-h-max"
            onRequestClose={() => {
                alert('')
                setCurrentView('')
                onClose()
            }}
        >
            <View
                className="w-10/12 left-[8.33%] absolute bottom-24 h-auto max-h-max p-5 bg-white rounded-[20px] mx-auto"
            >
                <TouchableHighlight
                    className=" m-auto absolute right-0 top-0 mr-2 mt-1 z-10"
                    activeOpacity={1.0}
                    underlayColor="#fff"
                    onPress={() => {
                        onClose()
                        setCurrentView('')
                    }}>
                    <Image
                        // className={`w-8 h-8 m-auto`}
                        className={`w-8 h-8 m-auto `}
                        source={CLOSE}
                    />
                </TouchableHighlight>


                <ScrollView
                    horizontal="true"
                >
                    <Text className="pt-4">hola</Text>
                </ScrollView>
            </View>
        </Modal> */}

    </>
}