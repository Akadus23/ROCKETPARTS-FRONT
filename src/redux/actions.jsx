import axios from "axios"



export function usuarioID(sub){
    return async function (dispatch) {
        const json = await axios(`/usuarios/${sub}`)
        return dispatch({
            type: "USUARIO_ID",
            payload: json.data
        })
    }
}