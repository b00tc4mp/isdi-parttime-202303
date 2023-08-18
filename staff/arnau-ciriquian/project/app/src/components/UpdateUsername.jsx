import { Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import { useState } from "react"
import { updateUsername } from "../logic/updateUsername.js"

export default function UpdateUsername({ closeUsernameModal }) {
    const [oldUsername, setOldUsername] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleCancelClick = () => {
        closeUsernameModal()
    }

    const handleUpdateUsernameClick = () => {
        try {
            updateUsername(oldUsername, newUsername, password)
               .then(() => closeUsernameModal())
               .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return (<View className="h-4/6 w-full">
        <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
        <View className="items-center _justify-between m-4 h-3/4">
            <View className="w-full">
                <Text className="text-white font-semibold text-xl">Old username:</Text>
                <TextInput className="w-full h-12 border bg-white rounded-md"
                    placeholder="old username"
                    onChangeText={oldName => (setOldUsername(oldName))}
                />
            </View>
            <View className="mt-2 w-full">
                <Text className="text-white font-semibold text-xl">New username:</Text>
                <TextInput className="w-full h-12 bg-white rounded-md border"
                    placeholder="new username"
                    onChangeText={newName => (setNewUsername(newName))}
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
            <TouchableOpacity className="flex flex-row items-center" onPress={handleUpdateUsernameClick}>
                <Text className="text-2xl font-bold ">Update</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}