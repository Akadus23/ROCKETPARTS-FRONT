import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import style from './Carrito.module.css'
import AjustarCantidad  from "../AjustraCantidad/AjustarCantidad"
import axios from "axios"
import {initMercadoPago,Wallet} from '@mercadopago/sdk-react'

export function Carrito (){
    const elementos = useSelector(state=>state.carritoCompra)
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('YOUR_PUBLIC_KEY');
    let ayu = 0
    const createPreference = async()=>{
        try {
            const response = await axios.post('',{
                description:'Compra multiples productos',
                price:ayu,
                quantity:1,
            })
            const {id} = response.data;
            return id
        } catch (error) {
            console.log(error);
        }
    }
    const handleBuy = async()=>{
        const id = await createPreference();
        if(id){
            setPreferenceId(id)
        }
    }
    const[mostrar,setMostrar] = useState(ayu)
    // const leftProducts = (productos,setProductos,precio)=>{
    //     setProductos(productos-1)
    //     if(productos-1 === 0) return setProductos(1)
    //     ayu = mostrar
    //     ayu -= precio
    //     setMostrar(ayu)
    // }
    // const plusProducts = (productos,setProductos,cant,precio)=>{
    //     setProductos(productos+1)
    //     if(productos + 1 > cant) return setProductos(productos)
    //     let acu = ((productos)*precio) + ayu
    //     setMostrar(acu)
    // }
    return(
        <div>
            <div>
                {elementos?.map((ele)=>{
                    ayu +=ele.precioproducto
                    return(
                        <div className={style.container} key={ele.id}>
                            <h3>{ele.nombreproducto}</h3>
                            <img src={ele.fotoprinc} alt="" />
                            <h2>{ele.precioproducto}</h2>
                            {/* <AjustarCantidad precio={ele.precioproducto} cant={ele.disponibproducto} plusProducts={plusProducts} leftProducts={leftProducts}/> */}
                        </div>
                    )
                })}
            </div>
            <br />
            <br />
            <div>
                Total:{mostrar||ayu}
            </div>
            <br />
            <br />
            <button onClick={handleBuy}>PAGAR</button>
            {preferenceId && <Wallet initialization ={{ preferenceId }}/>}
            <br />
            <br />
            <Link to='/Tienda'>Volver</Link>
        </div>
    )
}