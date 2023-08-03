import { 
    GET_ALL_PRODUCTS,
    ADD_CARRITO,
    REMOVE_CARRITO,
    BUSCAR_PERSONAJE_ID,
    PRECIO_TOTAL,
    SUMAR_CARRITO,
    RESTAR_CARRITO
 } from "./actions";


const initialState = {
    Productos: [],
    usuarioDetail: [],
    carritoCompra:[],
    detail:{},
    total:0
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "USUARIO_ID":
        return {
            ...state,
            usuarioDetail: payload
        };
        case PRECIO_TOTAL:
            return{
                ...state,
                total:payload
            }
        case SUMAR_CARRITO:
            return{
                ...state,
                total:state.total + payload
            }
        case RESTAR_CARRITO:
            return{
                ...state,
                total:state.total - payload
            }
        case GET_ALL_PRODUCTS:
        return {
            ...state,
            Productos: payload,
        };
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