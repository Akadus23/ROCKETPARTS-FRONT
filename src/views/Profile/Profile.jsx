import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { usuarioID } from "../../redux/actions";

export default function Profile() {

    const dispatch = useDispatch()
    const { isAuthenticated, user } = useAuth0();

    //const usuario = useSelector((state) => state.usuarioDetail)

    // useEffect(() => {
    //     dispatch(usuarioID(user.sub))
    // }, [])

    return (
        <h1>Este es el perfil</h1>
    )
}