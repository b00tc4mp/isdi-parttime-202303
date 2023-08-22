import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import { survivor1, survivor2, survivor3, survivor4, survivor5 } from '../../assets/characters/characterImages.js'
import { createNewCharacter } from '../logic/createNewCharacter.js'

export default function CharacterCreator({ user, onCharacterCreated }) {
    const [characterName, setCharacterName] = useState('')
    const [survivorImages, setSurvivorImages] = useState([])
    const [characterImage, setCharacterImage] = useState(null)

    useEffect(() => {
        setSurvivorImages([survivor1, survivor2, survivor3, survivor4, survivor5])
    }, [])

    const handleCreateNewCharacter = () => {
        try {
            createNewCharacter(characterName, characterImage)
                .then(() => onCharacterCreated())
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error)
        }
    }

    const chooseCharacter = image => {
        setCharacterImage(image)
    }

    return (
        <View className="flex justify-around items-center h-screen w-screen p-2">
            <View className="h-20 flex-row items-center justify-center">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="justify-center items-center h-16 w-2/4 mr-10">
                    <Text className=" text-2xl font-semibold">Hello, {user.name}!</Text>
                </View>
                <View className="justify-center items-center h-16 w-16 m-2 ml-10">
                    <TouchableOpacity>
                        <Image source={require('../../assets/generic/menu.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="h-3/4 w-full">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="items-center _justify-between m-4 h-5/6">
                    <View className="w-full">
                        <Text className="text-white font-semibold text-xl">Character name:</Text>
                        <TextInput className="w-full h-12 border bg-white rounded-md"
                            placeholder="name"
                            onChangeText={newCharacterName => (setCharacterName(newCharacterName))}
                        />
                    </View>

                    <View className="mt-2 w-full h-3/4">
                        <Text className="text-white font-semibold text-xl">Avatar:</Text>
                        <View className="w-full justify-center items-center h-full">
                            <ScrollView className="w-full h-full">
                                <View className="w-full h-full items-center">
                                    {survivorImages && survivorImages.map(element => <TouchableOpacity onPress={() => chooseCharacter(element)} className="w-60">
                                        <Image source={element} className={element === characterImage ? "w-60 h-80 mb-2 border-2 border-rose-600" : "w-60 h-80 mb-2"} />
                                    </TouchableOpacity>)}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View className="h-20 w-full absolute bottom-0 items-center flex-row justify-around">
                    <TouchableOpacity className="flex flex-row items-center" onPress={handleCreateNewCharacter}>
                        <Text className="text-2xl font-bold ">Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}