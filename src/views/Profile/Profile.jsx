import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { usuarioID } from "../../redux/actions";

export default function Profile() {

    const dispatch = useDispatch()
    const { isAuthenticated, user } = useAuth0();

    let userInfo = []

    const buscarInfo = () => {
        return async function () {
            const json = await axios('https://dev-jzsyp78gzn6fdoo4.us.auth0.com/userinfo')
            console.log(json);
            return userInfo.push(json.data)
        }
    }
    buscarInfo()
    console.log(userInfo);
    console.log(user, 'user auht0');

    //const usuario = useSelector((state) => state.usuarioDetail)

    // useEffect(() => {  
    //     dispatch(usuarioID(user.sub))
    // }, [])

    return (
        <h1>Este es el perfil</h1>
    )
}