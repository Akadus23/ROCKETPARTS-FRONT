import axios from "axios"
import { useEffect,useState } from "react"
import { URL } from "../../constantes"
import style  from './Filters.module.css'

export default function Filters({error,handleSelect,limpiar,ver,disponibles,handleSelectMarcas,noDisponibles,ordenarAlf,ordenarNum}){
    const[renCat, setRenCat] =useState([])
    const[renMarcas,setRenMarcas] = useState([])


    const [manejoFilt,setManejoFilt] = useState(true)
    const [noVerDispo,setNoverDispo] = useState(true)
    const[orden,setOrden] = useState(true)
    const [ordenAlf,setOrdenAlf] = useState(true)


    useEffect(()=>{
        async function resAxios(){
            const resApi = await axios(`${URL}products`)
            if(resApi.data){
                const categorias = []
                const marcas = []
                resApi.data.productos.map((ele)=>{
                    categorias.push(ele.categoria.toUpperCase())
                    marcas.push(ele.marca.toUpperCase())
                })
                setRenCat([... new Set(categorias?.sort())])
                setRenMarcas([... new Set(marcas?.sort())])
            }
        }
        resAxios()
    },[])
    return(
        <div className={style.container}>
            {ver.length || error.length?<button onClick={()=>{limpiar();setManejoFilt(true);setNoverDispo(true)}}>Ver todo el catalogo</button>:null}
            <select onChange={(event)=>{handleSelect(event,setManejoFilt);setNoverDispo(true)}}>
                <option key='limpiar' name='limpiar' value="limpiar">Buscar por categoria</option>
                {renCat?.map((ele)=>{
                    return(
                        <option key={ele} name={ele}>{ele}</option>
                    )
                })}
            </select>
            <select onChange={(event)=>{handleSelectMarcas(event,manejoFilt,setManejoFilt);setNoverDispo(true)}}>
                <option key='limpiar' name='limpiar' value='limpiar'>Buscar por marca</option>
                {renMarcas?.map((ele)=>{
                    return(
                        <option key={ele} name={ele}>{ele}</option>
                    )
                })}
            </select>
            {noVerDispo&&<button onClick={disponibles}>disponibles</button>}
            <button onClick={()=>{noDisponibles();setNoverDispo(false)}}>Buscar todos los productos agotados</button>
            <h3>Ordenar busqueda</h3>
            <br />
            <button value='Ordenar de la A-Z' onClick={(event)=>{ordenarAlf(ver,char=>char.nombreproducto,ordenAlf);setOrdenAlf(!ordenAlf)}}>Ordenar por alfabeto {ordenAlf?'🡻':'🡹'}</button>
            <button onClick={()=>{ordenarNum(ver,char=>Number(char.precioproducto),orden);setOrden(!orden)}}>Ordenar por valor {orden?'🡹':'🡻'}</button>
        </div>
    )
}