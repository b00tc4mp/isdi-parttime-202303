import { View, StatusBar, Text, Alert, Dimensions, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import AppContext from "../AppContext.js";
import Context from '../AppContext.js'
import BottomSheet from '@gorhom/bottom-sheet';

import { WHITE_CLOSE, CLOSE } from '../../assets/icons';

export default function Home({ user, handleCloseWelcomeMessage }) {
    const { colorScheme } = useContext(Context)

    // const [welcomeMessageStorage, setWelcomeMessageStorage] = useState(false)

    let mainColor
    if (colorScheme === 'dark') {
        mainColor = 'rgb(31 41 55)'
    } else if (colorScheme === 'light') {
        mainColor = '#ffffff'
    }



    const onCloseWelcomeMessage = () => {
        handleCloseWelcomeMessage()
    }



    return <>
        <View className="flex-1 w-full h-screen bg-black60 justify-center items-center">
            <TouchableHighlight onPress={onCloseWelcomeMessage} className="absolute right-2 top-10 z-50 shadow-md shadow-black ">
                <Image source={WHITE_CLOSE} className="w-10 h-10" />
            </TouchableHighlight>
            <View className="w-10/12 max-h-[80vh] p-7 bg-white rounded-2xl">
                <ScrollView>
                    <Text className="text-lg font-semibold">Welcome {user.name}!</Text>
                    <Text className="mb-2">Primero quiero agradecerte tu apoyo en mi proyecto.</Text>
                    <Text className="mb-2">En esta pantalla te explicaré que puedes hacer por ahora en la aplicación:</Text>
                    <Text className="mb-0.5 font-bold">Al entrar a la app:</Text>
                    <Text className="mb-2">Registrarte y loguearte si es la primera vez que entras<Text className="italic text-sm">(debes confirmar tu cuenta por correo)</Text></Text>
                    <Text className="mb-2">Ver los parques cercanos nada mas entrar en la app</Text>
                    <Text className="mb-0.5 font-bold">Desde el menú inferior:</Text>
                    {/* <Text className="mb-2">Volver a tu ubicación y ver los parques cercanos a 10km</Text> */}
                    <Text className="mb-2">Ver los parques cercanos en el icono de "cercanos" en un apartado deslizable</Text>
                    <Text className="mb-2">Listar tus parques favoritos</Text>
                    <Text className="mb-2">Crear un parque nuevo (por ahora lo tienes que crear desde el mismo lugar para que coja las coordenadas)</Text>
                    <Text className="mb-0.5 font-bold">Desde el menú superior:</Text>
                    <Text className="mb-2">Buscar por ciudad y ver los parques a un radio de 10km</Text>
                    <Text className="mb-0.5 font-bold">Desde el menu lateral:</Text>
                    <Text className="mb-2">Listar tus parques favoritos</Text>
                    <Text className="mb-2">Cerrar sesión</Text>
                    {/* <Text className="mb-2">Mandarme un mensaje de feedback</Text> */}
                    <Text className="mb-0.5 font-bold">Desde el mapa:</Text>
                    <Text className="mb-2">Abrir pin de un parque </Text>
                    <Text className="mb-2">Volver a tu posición actual con el boton situado encima del menú inferior</Text>
                    <Text className="mb-0.5 font-bold">Desde un parque:</Text>
                    <Text className="mb-2">Ver la información básica: Calle, ciudad.</Text>
                    <Text className="mb-2">Recibir indicaciones para llegar en tu aplicacion nativa de mapas</Text>
                    <Text className="mb-2">Ver los detalles de sol, sombra y los elementos de dispone el parque</Text>
                    <Text className="mb-2">Ver las imagenes en miniatura, y en grande si las presionas</Text>
                    <Text className="mb-2 text-sm font-semibold">Gracias y espero que la disfrutes 💚</Text>
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="border border-mainLime bg-mainLime rounded-full mt-4 self-center w-full  "
                    onPress={onCloseWelcomeMessage} >
                    <View className="font-bold px-6 py-2 self-center rounded-full" >
                        <Text className="font-bold text-lg">OK</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    </>
}