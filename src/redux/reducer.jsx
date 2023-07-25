import { GET_ALL_PRODUCTS } from "./actions";


const initialState = {
    allProducts:[]
}


export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_PRODUCTS:
        return {
          ...state,
          allProducts: payload,
        };
        default:
            return {...state}
    }
}


