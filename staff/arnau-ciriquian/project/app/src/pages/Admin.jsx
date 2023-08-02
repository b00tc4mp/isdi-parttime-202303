import { View, Image, TouchableOpacity, Text } from 'react-native'
import Missions from '../components/Missions'

const Admin = () => {
    return (
        <View className="flex justify-center items-center h-screen w-screen pt-2">
            <Image source={require('../../assets/admin/main-bg-admin.jpg')} className="absolute scale-125 bottom-0" ></Image>
            <View className="h-24 w-5/6 flex-row items-center">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="h-16 w-16 m-2 shadow-sm shadow-lime-700">
                    <Image source={require('../../assets/admin/Tallahassee.jpeg')} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>
                </View>
                <View className="justify-center items-center h-16 w-2/4">
                    <Text className=" text-2xl font-semibold">{process.env.ADMIN}</Text>
                </View>
                <View className="justify-center items-center h-16 w-16 m-2">
                    <TouchableOpacity>
                        <Image source={require('../../assets/generic/menu.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="border-2 border-red-400 h-3/4 w-5/6 m-5">
                <Missions/>
            </View>
        </View>
    )
}

export default Admin