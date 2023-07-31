import { ADD_CARRITO,REMOVE_CARRITO } from "./actions"

const initialState = {
    products: [],
    usuarioDetail: [],
    carritoCompra:[]
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "USUARIO_ID":
        return {
            ...state,
            usuarioDetail: payload
        }
        case ADD_CARRITO:
            return {...state,carritoCompra:[...state.carritoCompra,payload]}
        case REMOVE_CARRITO:
            return {...state,carritoCompra:state.carritoCompra.filter((ele)=>ele.id !== payload)}
        default:
            return{...state}
    }
}