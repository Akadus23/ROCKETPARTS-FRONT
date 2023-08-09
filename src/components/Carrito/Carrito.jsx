import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import style from './Carrito.module.css'
import axios from "axios"
import {initMercadoPago,Wallet} from '@mercadopago/sdk-react'
import { precioInicial, restarCarrito, sumarCarrito, productosAComprar, productosRetirados, limpiarComprados, quitarStock, limpiarCarrito, removeCarrito } from "../../redux/actions"
import { URL } from "../../constantes"
import { useAuth0 } from "@auth0/auth0-react";

const saveInLocalStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function Carrito (){

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    const elementos = useSelector(state=>state.carritoCompra)
    const total = useSelector(state=>state.total)
    const porComprar = useSelector(state=>state.comprados)
    const [preferenceId, setPreferenceId] = useState(null)

    //Estado Local para almacenar carrito desde localStorage
    const [carritoLocal, setCarritoLocal] = useState([]);
    
    initMercadoPago('TEST-c400579c-6b28-4f81-b113-f46d83d791dd');
    const dispatch = useDispatch()

    const createPreference = async()=>{
        try {
            const response = await axios.post(`${URL}create-order`,{
                description:'Compra multiples productos',
                price:Number(total),
                quantity:1,
            })
            const {id} = response.data;
            console.log(response.data);
            return id
        } catch (error) {
            console.log(error);
        }
    }
    const handleBuy = async()=>{
        if(isAuthenticated){
            const id = await createPreference();
        if(id){
            setPreferenceId(id)
        }
        } else {
            loginWithRedirect()
        }
        
    }
    useEffect(()=>{
        //Leer carrito del localstorage al montarse
        const carritoGuardado = localStorage.getItem("carrito");
        if(carritoGuardado) {
            setCarritoLocal(JSON.parse(carritoGuardado));
        }

        dispatch(limpiarComprados())
        elementos.map(ele=>{
            dispatch(productosAComprar(ele.id))
        })
        dispatch(precioInicial(elementos))

        //Guardar carrito actualizado en localStorage
        saveInLocalStorage(elementos);
    },[elementos])
    return(
        <div class='text-zinc-100'>
            {elementos.length?
            <div>
                {elementos.map((ele)=>{
                    const [cont,setCont] = useState(1)
                    
                    const sum = ()=>{
                        if(cont+1 > ele.disponibproducto)return
                        setCont(cont +1)
                        dispatch(sumarCarrito(ele.precioproducto))
                        dispatch(productosAComprar(ele.id))
                    }
                    const res = ()=>{
                        if(cont-1<1)return
                        setCont(cont - 1)
                        dispatch(restarCarrito(ele.precioproducto))
                        dispatch(productosRetirados(ele.id))
                    }
                    const quitar = (id)=>{
                        window.location.reload(true);
                        dispatch(removeCarrito(Number(id)))
                    }
                    return(
                        <div className={style.container} key={ele.id}>
                            <button onClick={()=>quitar(ele.id)}>quitar carrito</button>
                            <h3>{ele.nombreproducto}</h3>
                            <img src={ele.fotoprinc} alt="" />
                            <h2>{ele.precioproducto}</h2>
                            <div className={style.contAum}>
                                {!preferenceId?<button onClick={res}>-</button>:null}{cont}{!preferenceId?<button onClick={sum}>+</button>:null}
                            </div>
                        </div>
                    )
                })}
            </div>:<h1>Aun no agregas nada a tu carrito</h1>}
            <br />
            <br />
            {elementos.length?<div>
                Total:{total}
            </div>:null}
            <br />
            <br />
            {elementos.length?<div>
                <button onClick={handleBuy}>PAGAR</button>
                {preferenceId && <div><Wallet initialization ={{ preferenceId }}/></div>}
            </div>:null}
            <br />
            <br />
            <Link to='/Tienda'><button>Volver</button></Link>
        </div>
    )
}
