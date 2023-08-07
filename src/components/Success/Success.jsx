import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { quitarStock,limpiarComprados,limpiarCarrito } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Success(params) {
    const dispatch = useDispatch()
    const porComprar = useSelector(state=>state.comprados)
    useEffect(()=>{
        porComprar?.map((ele)=>{
            dispatch(quitarStock(ele))
        })
        dispatch(limpiarComprados())
        dispatch(limpiarCarrito())
    },[dispatch])
    return(
        <div>
            GRACIAS POR SU COMPRA
            <br />
            <Link to='/Tienda'><button>Volver a comprar con nosostros!!</button></Link>
        </div>
    )
    
}