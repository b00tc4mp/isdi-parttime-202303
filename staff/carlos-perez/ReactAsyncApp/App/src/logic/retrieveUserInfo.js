import {context} from '../main.js'
import retrieveUser from './retrieveUser.js';
import { useState, useEffect } from 'react';



export default function getInitials(){
    const [user, setUser] = useState()
useEffect(() => {
    try {
        retrieveUser(context.userId, (error, user) => {
            if (error) {
                alert(error.message)

                return
            }

            setUser(user)
            return user.name.split(" ").map((n) => n[0]).join("");
        })
    } catch (error) {
        alert(error.message)
    }
}, [])
}
