import axios from "axios"

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"


export function usuarioID(sub){
    return async function (dispatch) {
        const json = await axios(`/usuarios/${sub}`)
        return dispatch({
            type: "USUARIO_ID",
            payload: json.data
        })
    }
}

export const getProductos = () =>{
    return async function(dispatch){
        try {
            const json = await axios.get('http://localhost:3001/products')
            console.log(json.data);
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: json.data.productos
            })
        } catch (error) {
            console.log(error);
        }
    }
}