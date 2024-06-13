import { Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import { useState } from "react"
import { updateUserEmail } from "../logic/updateUserEmail.js"

export default function UpdateUserEmail({ closeEmailModal }) {
    const [oldEmail, setOldEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleCancelClick = () => {
        closeEmailModal()
    }

    const handleUpdateUserEmailClick = () => {
        try {
            updateUserEmail(oldEmail, newEmail, password)
               .then(() => closeEmailModal())
               .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (<View className="h-4/6 w-full">
        <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
        <View className="items-center _justify-between m-4 h-3/4">
            <View className="w-full">
                <Text className="text-white font-semibold text-xl">Old email:</Text>
                <TextInput className="w-full h-12 border bg-white rounded-md"
                    placeholder="old email"
                    onChangeText={oldName => (setOldEmail(oldName))}
                />
            </View>
            <View className="mt-2 w-full">
                <Text className="text-white font-semibold text-xl">New email:</Text>
                <TextInput className="w-full h-12 bg-white rounded-md border"
                    placeholder="new email"
                    onChangeText={newEmail => (setNewEmail(newEmail))}
                />
            </View>
            <View className="mt-2 w-full">
                <Text className="text-white font-semibold text-xl">Password:</Text>
                <TextInput className="w-full h-12 border bg-white rounded-md"
                    secureTextEntry={true}
                    placeholder="password"
                    onChangeText={newPassword => (setPassword(newPassword))}
                />
            </View>
        </View>
        <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
            <TouchableOpacity className="flex flex-row items-center"
                onPress={handleCancelClick}>
                <Text className="text-2xl font-bold text-red-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center" onPress={handleUpdateUserEmailClick}>
                <Text className="text-2xl font-bold ">Update</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}