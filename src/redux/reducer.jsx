import { 
    GET_ALL_PRODUCTS
 } from "./actions";

import { ADD_CARRITO,REMOVE_CARRITO,BUSCAR_PERSONAJE_ID } from "./actions"

const initialState = {
    Productos: [],
    usuarioDetail: [],
    carritoCompra:[],
    detail:{}
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "USUARIO_ID":
        return {
            ...state,
            usuarioDetail: payload
        };

        case GET_ALL_PRODUCTS:
        return {
            ...state,
            Productos: payload,
        };
        default:
            return {...state}
        case BUSCAR_PERSONAJE_ID:
            return{...state,detail:payload}
        case ADD_CARRITO:
            return {...state,carritoCompra:[...state.carritoCompra,payload]}
        case REMOVE_CARRITO:
            return {...state,carritoCompra:state.carritoCompra.filter((ele)=>ele.id !== payload)}
        default:
            return{...state}
    };

        
}