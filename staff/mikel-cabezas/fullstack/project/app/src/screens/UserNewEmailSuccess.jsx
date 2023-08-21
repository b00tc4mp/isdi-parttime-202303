import React, { useEffect, useContext } from "react";
import { Alert } from "react-native";

import AppContext from "../AppContext.js";
const { Provider } = AppContext
import Context from '../AppContext.js'

export default function UserNewEmailSuccess({ route, navigation }) {



    useEffect(() => {
        try {

            // navigation.getParam('message', 'default value')
            navigation.push('Home', { message: 'Success. New email setted' });


            // navigation.reset({
            //     index: 0,
            //     message: 'hey',
            //     routes: [{ name: 'Home' }],
            // })
        } catch (error) {
            console.log(error)
        }

    }, []);
}