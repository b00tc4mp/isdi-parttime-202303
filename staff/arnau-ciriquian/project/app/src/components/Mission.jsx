//import { deletePost } from "../logic/deletePost"

//import { utils } from "com"

import { View, Text, Image, TouchableOpacity } from "react-native"

export default function Mission({ mission: { id, image, tittle, info, level, difficulty, survivor, visibility, date }, onEditClick, /*onDeletePostClick*/ }) {

    const handleOpenEditModal = () => onEditClick(id)
    
    /*const handleDeletePost = () => {
        const confirmation = confirm('Are you sure that you want to delete this post? This action cannot be undone!')

        if (confirmation) {
            try {
                deletePost(context.token, id)
                    .then(() => {
                        onDeletePostClick()
                    })
                    .catch(error => alert(error.message))
            } catch (error) {
                alert(error.message)
            }
        }
    }*/

    if (!visibility) {
        return <View className="h-20 flex-row items-center justify-center ml-5 mr-5 mt-2">
            <View className="absolute bg-red-400 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="h-16 w-16 justify-center items-center">
                <Image source={require("../../assets/generic/k9.png")} className="h-10 w-10"></Image>
            </View>
            <View className="justify-center items-center h-16 w-3/5">
                <View className="w-full">
                    <Text className=" text-xl font-bold">{tittle}</Text>
                </View>
                <View className="w-full">
                    <Text className=" text-lg font-semibold">Level {level} - {difficulty} </Text>
                </View>
            </View>
            <View className="justify-center items-center h-16 w-16 mr-2">
                <TouchableOpacity onPress={handleOpenEditModal}>
                    <Image source={require('../../assets/generic/settings.png')} className="h-10 w-10"></Image>
                </TouchableOpacity>
            </View>
        </View>
    }

    if (visibility) {
        return <View className="h-20 flex-row items-center justify-center ml-5 mr-5 mt-2">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="h-16 w-16 justify-center items-center">
                <Image source={require("../../assets/generic/k9.png")} className="h-10 w-10"></Image>
            </View>
            <View className="justify-center items-center h-16 w-3/5">
                <View className="w-full">
                    <Text className=" text-xl font-bold">{tittle}</Text>
                </View>
                <View className="w-full">
                    <Text className=" text-lg font-semibold">Level {level} - {difficulty} </Text>
                </View>
            </View>
            <View className="justify-center items-center h-16 w-16 mr-2">
                <TouchableOpacity onPress={handleOpenEditModal}>
                    <Image source={require('../../assets/generic/settings.png')} className="h-10 w-10"></Image>
                </TouchableOpacity>
            </View>
        </View>
    }
}