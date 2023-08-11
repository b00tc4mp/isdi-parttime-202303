import React, { useEffect, useState, useContext } from "react";
import { Keyboard, View, Image, TextInput, TouchableHighlight, Text } from 'react-native';

import Context from '../../AppContext.js'
import * as Animatable from 'react-native-animatable';
import {
    MENU, FILTER,
    WHITE_MENU, WHITE_MY_LOCATION
} from '../../../assets/icons/index.js';

import retrievePlaygroundsFromCity from "../../logic/playgrounds/retrievePlaygroundsFromCity.js";


export default function SearchResults({ handleCloseModals, data, handleViewPlaygroundsFromCity }) {

    if (colorScheme === 'dark') isDark = true
    let isDark
    let searchTimeOut

    const { modal, setModal, colorScheme, TOKEN } = useContext(Context)
    const [animation, setAnimation] = useState('fadeInDown')

    useEffect(() => {
    }, [data]);

    const onSearchPlayground = () => {

    }

    const simpleSearchRegion = (search) => {
        // console.log(search)
        retrievePlaygroundsFromCity(TOKEN, search)
            .then(playgroundsResult => {
                // console.log(playgroundsResult)
                handleViewPlaygroundsFromCity(playgroundsResult)
            })
    }

    return <>
        {data.length > 0 && data.map((result, index) => {
            return <>
                {index >= 0 && <><View className="pt-3 border-mainGray" key={index} />
                    <TouchableHighlight className="py-3 px-4" onPress={() => simpleSearchRegion(result)}>
                        <Text> {result}</Text>
                    </TouchableHighlight>
                </>}

            </>
        })}

    </>
}


