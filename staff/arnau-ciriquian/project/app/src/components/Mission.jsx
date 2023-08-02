//import { deletePost } from "../logic/deletePost"

//import { utils } from "com"

//const { extractSubFromToken } = utils
import { View, Text, Image } from "react-native"

export default function Mission({ mission: { image, tittle, info, level, difficulty, survivor, visibility, date }/*, onEditClick, onDeletePostClick*/ }) {

    /*const handleOpenEditModal = () => onEditClick(id)

    const handleDeletePost = () => {
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

    console.log('Mission -> Render')

    //const userId = extractSubFromToken(context.token)

    if (!visibility) {
        return <View className="h-24 flex-row items-center m-1">
            <View className="absolute bg-red-400 h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="h-16 w-16 m-2">
                <Image source={require("../../assets/home/k9.png")} className="h-16 w-16"></Image>
            </View>
            <View className="justify-center items-center h-16 w-2/4">
                <Text className=" text-2xl font-semibold">{tittle}</Text>
            </View>
            <View className="justify-center items-center h-16 w-16 m-2">
                <Text className=" text-2xl font-semibold">Level: {level}</Text>
            </View>
        </View>
    }

    if (visibility) {
        return <View className="h-24 flex-row items-center m-1">
            <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
            <View className="h-16 w-16 m-2">
                <Image source={require("../../assets/home/k9.png")} className="h-16 w-16"></Image>
            </View>
            <View className="justify-center items-center h-16 w-2/4">
                <Text className=" text-2xl font-semibold">{tittle}</Text>
            </View>
            <View className="justify-center items-center h-16 w-16 m-2">
                <Text className=" text-2xl font-semibold">Level: {level}</Text>
            </View>
        </View>
    }
}