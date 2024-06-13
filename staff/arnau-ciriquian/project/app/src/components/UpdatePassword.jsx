import { Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import { useState } from "react"
import { updateUserPassword } from "../logic/updateUserPassword.js"

export default function UpdateUserPassword({ closePasswordModal }) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

    const handleCancelClick = () => {
        closePasswordModal()
    }

    const handleUpdateUserPasswordClick = () => {
        try {
            updateUserPassword(oldPassword, newPassword, newPasswordConfirmation)
                .then(() => closePasswordModal())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (<View className="h-4/6 w-full">
        <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
        <View className="items-center _justify-between m-4 h-3/4">
            <View className="w-full">
                <Text className="text-white font-semibold text-xl">Old password:</Text>
                <TextInput className="w-full h-12 border bg-white rounded-md"
                    secureTextEntry={true}
                    placeholder="old password"
                    onChangeText={oldPassword => (setOldPassword(oldPassword))}
                />
            </View>
            <View className="mt-2 w-full">
                <Text className="text-white font-semibold text-xl">New password:</Text>
                <TextInput className="w-full h-12 bg-white rounded-md border"
                    secureTextEntry={true}
                    placeholder="new password"
                    onChangeText={newPassword => (setNewPassword(newPassword))}
                />
            </View>
            <View className="mt-2 w-full">
                <Text className="text-white font-semibold text-xl">New password confirmation:</Text>
                <TextInput className="w-full h-12 border bg-white rounded-md"
                    secureTextEntry={true}
                    placeholder="new password confirmation"
                    onChangeText={newPasswordConfirmation => (setNewPasswordConfirmation(newPasswordConfirmation))}
                />
            </View>
        </View>
        <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
            <TouchableOpacity className="flex flex-row items-center"
                onPress={handleCancelClick}>
                <Text className="text-2xl font-bold text-red-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center" onPress={handleUpdateUserPasswordClick}>
                <Text className="text-2xl font-bold ">Update</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}