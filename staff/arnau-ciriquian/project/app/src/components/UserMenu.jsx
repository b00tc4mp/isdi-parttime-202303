import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import deleteAccount from "../logic/deleteAccount.js"

export default function UserMenu({ onUserLogout, onUpdateModalClick, user, onDeleteUserAccount }) {
    const handleUserLogout = () => {
        onUserLogout()
    }

    const handleGoToUpdateUsername = () => {
        onUpdateModalClick('updateUsername')
    }

    const handleGoToUpdateEmail = () => {
        onUpdateModalClick('updateEmail')
    }

    const handleGoToUpdatePassword = () => {
        onUpdateModalClick('updatePassword')
    }

    const handleGoToUpdateCharacter = () => {
        onUpdateModalClick('updateCharacter')
    }

    const handleDeleteAccount = () => {
        Alert.alert('Delete account?', 'Are you sure that you want to delete your account? This action cannot be undone!', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    try {
                        deleteAccount()
                            .then(() => {
                                onDeleteUserAccount()
                            })
                            .catch(error => alert(error.message))
                    } catch (error) {
                        alert(error.message)
                    }
                }
            }
        ])
    }

    return (
        <View className="h-full w-full">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="justify-center ml-4 h-20">
                <Text className="text-2xl font-bold">Hello, {user.name}!</Text>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center" onPress={handleGoToUpdateUsername}>
                    <Image source={require('../../assets/generic/construction.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Update username</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center" onPress={handleGoToUpdateEmail}>
                    <Image source={require('../../assets/generic/construction.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Update email</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center" onPress={handleGoToUpdatePassword}>
                    <Image source={require('../../assets/generic/construction.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Update password</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center" onPress={handleGoToUpdateCharacter}>
                    <Image source={require('../../assets/generic/construction.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Update character</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center" onPress={handleDeleteAccount}>
                    <Image source={require('../../assets/generic/skull.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold text-red-800">Delete account</Text>
                </TouchableOpacity>
            </View>
            <View className="h-20 w-full absolute bottom-0 justify-center items-center">
                <TouchableOpacity onPress={handleUserLogout} className="flex flex-row items-center">
                    <Text className="text-2xl font-bold text-red-800">Logout</Text>
                    <Image source={require('../../assets/generic/logout.png')} className="h-10 w-10 ml-2"></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}