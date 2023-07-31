import axios from "axios"
export const ADD_CARRITO = 'ADD_CARRITO'
export const REMOVE_CARRITO = 'REMOVE_CARRITO'


export const addCarrito = (char) =>{
    const response = {...char}

    return {
        type:ADD_CARRITO,
        payload:response,
    }
}
export const removeCarrito = (id) =>{
    return {
        type:REMOVE_CARRITO,
        payload:id
    }
}


export function usuarioID(sub){
    return async function (dispatch) {
        const json = await axios(`/usuarios/${sub}`)
        return dispatch({
            type: "USUARIO_ID",
            payload: json.data
        })
    }
}