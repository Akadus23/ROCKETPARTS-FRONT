const initialState = {
    products: [],
    usuarioDetail: [],
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "USUARIO_ID"
        return {
            ...state,
            usuarioDetail: payload
        }
    }
}