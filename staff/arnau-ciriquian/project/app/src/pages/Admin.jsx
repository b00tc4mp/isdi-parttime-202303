import { View, Image } from 'react-native'

const Admin = () => {
    return (
        <View className="flex justify-center items-center h-screen w-screen">
            <Image source={require('../../assets/admin/main-bg-admin.jpg')} className="absolute scale-125 bottom-0" ></Image>
        </View>
    )
}

export default Admin