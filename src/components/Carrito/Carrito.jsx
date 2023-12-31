import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import style from './Carrito.module.css'
import axios from "axios"
import {initMercadoPago,Wallet} from '@mercadopago/sdk-react'
import { precioInicial, restarCarrito, sumarCarrito, productosAComprar, productosRetirados, limpiarComprados, quitarStock, limpiarCarrito, removeCarrito, usuarioID } from "../../redux/actions"
import { URL } from "../../constantes"
import { useAuth0 } from "@auth0/auth0-react";

const saveInLocalStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

export function Carrito (){

    const {user, isAuthenticated, loginWithRedirect } = useAuth0();
    

    const elementos = useSelector(state=>state.carritoCompra)
    const total = useSelector(state=>state.total)
    const usuario = useSelector(state=>state.usuarioDetail)
    const [preferenceId, setPreferenceId] = useState(null)
    console.log(usuario);

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
                usuario
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
        if(isAuthenticated){
            dispatch(usuarioID(user.sub))
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
        <div class='text-zinc-100' className={style.allContainer}>
            {elementos.length?
            <div className={style.container}>
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
                        // window.location.reload();
                        dispatch(removeCarrito(Number(id)))
                    }
                    return(
                        <div className={style.card} key={ele.id}>
                            <img className={style.imagen} src={ele.fotoprinc} alt="" />
                            <div className={style.cuerpo}>
                            <h3 >{ele.nombreproducto}</h3>
                            <br />
                            <h2 className={style.tag}>{ele.precioproducto}</h2>
                            <div className={style.contAum}>
                                {!preferenceId?<button className={style.botonesAyD} onClick={res}>-</button>:null}{cont}{!preferenceId?<button className={style.botonesAyD} onClick={sum}>+</button>:null}
                            </div>  
                            <Link to='/Tienda'><button className={style.butonInterno} onClick={()=>quitar(ele.id)}>quitar carrito</button></Link>
                            </div>

                        </div>
                    )
                })}
            </div>:<h1 className={style.carritoVacio}>Aun no agregas nada a tu carrito</h1>}
            <br />
            <br />
            {elementos.length?<div className={style.total}>
                Total:   {total}
            </div>:null}
            <br />
            <br />
            {elementos.length?<div className={style.contPago}>
                {preferenceId?<div><Wallet initialization ={{ preferenceId }}/></div>:<button className={style.butonInterno} onClick={handleBuy}>PAGAR</button>}
            </div>:null}
            <br />
            <br />
        </div>
    )
}