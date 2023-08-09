import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { usuarioID } from "../../redux/actions";

export default function Profile() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useAuth0();

    const [userInfo, setUserInfo] = useState([]);

    const buscarInfo = async () => {
        try{
            const response = await axios.get('https://dev-jzsyp78gzn6fdoo4.us.auth0.com/userinfo')
            const userData = response.data;

            console.log(userData);
            setUserInfo(userData);

            //set in localstorage
            localStorage.setItem("userInfo", JSON.stringify({
                accessToken: user.idToken,
                userId: userData.sub // Use the relevant identifier from userData
            }));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        buscarInfo();
        console.log(userInfo);
        console.log(user, "user auth0");
    }, [user]);

    //const usuario = useSelector((state) => state.usuarioDetail)

    // useEffect(() => {  
    //     dispatch(usuarioID(user.sub))
    // }, [])

    return (
        <h1>Este es el perfil</h1>
    )
}