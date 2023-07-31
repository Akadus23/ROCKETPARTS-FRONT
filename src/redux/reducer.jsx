import { 
    GET_ALL_PRODUCTS
 } from "./actions";

const initialState = {
    products: [],
    usuarioDetail: [],
    
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
            products: payload,
        };
    };

        
}