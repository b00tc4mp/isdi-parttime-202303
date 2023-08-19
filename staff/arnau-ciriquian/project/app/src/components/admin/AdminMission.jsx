import { deleteMission } from "../../logic/deleteMission.js"
import { useEffect, useState } from "react"
import manageMissionImages from "../../logic/manageMissionImages.js"

//import { utils } from "com"

import { View, Text, Image, TouchableOpacity, Alert } from "react-native"

export default function AdminMission({ mission: { id, image, tittle, info, level, difficulty, survivor, visibility, date }, onEditClick, onDeleteMissionClick }) {
    const [missionImage, setMissionImage] = useState(null)

    const handleOpenEditModal = () => onEditClick(id)

    const handleDeleteMission = () => {
        Alert.alert('Delete mission?', 'Are you sure that you want to delete this mission? This action cannot be undone!', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    try {
                        deleteMission(id)
                            .then(() => {
                                onDeleteMissionClick()
                            })
                            .catch(error => alert(error.message))
                    } catch (error) {
                        alert(error.message)
                    }
                }
            }
        ])
    }

    useEffect(() => {
        const imageName = image.slice(21, -4)
        setMissionImage(manageMissionImages(imageName))
    }, [])

    return <>
        <View className="h-20 flex-row items-center justify-between ml-5 mr-5 mt-2">
            {visibility ? <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View> : <View className="absolute bg-red-400 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>}
            <View className="flex-row w-full h-full items-center">
                <View className="h-10 w-10 justify-center items-center m-2">
                    <Image source={missionImage} className="h-10 w-10"></Image>
                </View>
                <View className="justify-center items-center h-16 w-3/4">
                    <View className="w-full items-center">
                        <Text className=" text-xl font-bold">{tittle}</Text>
                    </View>
                    <View className="w-full items-center">
                        <Text className=" text-lg font-semibold">Level {level} - {difficulty} </Text>
                    </View>
                </View>
            </View>

        </View>
        <View className="h-10 flex-row items-center justify-between ml-5 mr-5">
            <View className="justify-center items-center h-10 w-2/4">
                <View className="absolute bg-orange-300 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <TouchableOpacity onPress={handleOpenEditModal} className="flex-row justify-between items-center w-full p-5">
                    <Image source={require('../../../assets/generic/settings.png')} className="h-8 w-8"></Image>
                    <Text className="text-lg font-bold">Update</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center h-10 w-2/4">
                <View className="absolute bg-rose-400 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <TouchableOpacity onPress={handleDeleteMission} className="flex-row justify-between items-center w-full p-5">
                    <Image source={require('../../../assets/generic/settings.png')} className="h-8 w-8"></Image>
                    <Text className="text-lg font-bold">Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>

}