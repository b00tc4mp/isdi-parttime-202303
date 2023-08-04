import { View, Image, TouchableOpacity, Text } from 'react-native'
import Missions from '../components/Missions'
import AdminMenu from '../components/AdminMenu'
import { useState } from 'react'
import NewMission from '../components/NewMission'

const Admin = ({ onLogoutSession }) => {
    const [modal, setModal] = useState(null)

    const handleAdminModal = () => {
        modal ? setModal(null) : setModal('adminMenu')
    }

    const handleNewMissionModal = () => {
        setModal('newMission')
    }

    const handleLogoutAdmin = () => {
        onLogoutSession()
    }

    const handleCloseNewMissionModal = () => {
        setModal(null)
    }

    return (
        <View className="flex justify-center items-center h-screen w-screen p-2">
            <Image source={require('../../assets/admin/main-bg-admin.jpg')} className="absolute scale-125 bottom-0" ></Image>
            <View className="h-20 mr-4 flex-row items-center">
                <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                <View className="h-16 w-16 m-2 shadow-sm shadow-lime-700">
                    <Image source={require('../../assets/admin/Tallahassee.jpeg')} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>
                </View>
                <View className="justify-center items-center h-16 w-2/4">
                    <Text className=" text-2xl font-semibold">{process.env.ADMIN}</Text>
                </View>
                <View className="justify-center items-center h-16 w-16 m-2">
                    <TouchableOpacity onPress={handleAdminModal}>
                        <Image source={require('../../assets/generic/menu.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="h-3/4 w-full pl-2 pr-2 m-5">
                {!modal && <Missions/>}
                {modal === 'adminMenu' && <AdminMenu onAdminLogout={handleLogoutAdmin} onNewMission={handleNewMissionModal}/>}
                {modal === 'newMission' && <NewMission onMissionCreated={handleCloseNewMissionModal}/>}
            </View>
        </View>
    )
}

export default Admin