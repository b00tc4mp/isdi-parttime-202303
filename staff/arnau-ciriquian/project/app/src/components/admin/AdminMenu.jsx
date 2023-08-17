import { View, Text, TouchableOpacity, Image } from "react-native"
import { useState } from "react"

export default function AdminMenu({ onAdminLogout, onNewMission }) {
    const handleAdminLogout = () => {
        onAdminLogout()
    }

    const handleNewMissionModal = () => {
        onNewMission()
    }

    return (
        <View className="h-full w-full">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity onPress={handleNewMissionModal} className="flex flex-row items-center">
                    <Image source={require('../../../assets/generic/construction.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Create new mission</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity _onPress={handleAdminLogout} className="flex flex-row items-center">
                    <Image source={require('../../../assets/admin/info.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Game info</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center">
                    <Image source={require('../../../assets/admin/develop.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Under construction</Text>
                </TouchableOpacity>
            </View>
            <View className="justify-center ml-4 h-20">
                <TouchableOpacity className="flex flex-row items-center">
                    <Image source={require('../../../assets/admin/develop.png')} className="h-10 w-10 mr-5"></Image>
                    <Text className="text-xl font-bold">Under construction</Text>
                </TouchableOpacity>
            </View>
            <View className="h-20 w-full absolute bottom-0 justify-center items-center">
                <TouchableOpacity onPress={handleAdminLogout} className="flex flex-row items-center">
                    <Text className="text-2xl font-bold text-red-800">Logout</Text>
                    <Image source={require('../../../assets/generic/logout.png')} className="h-10 w-10 ml-2"></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}