import axios from "axios"
import { useEffect,useState } from "react"

export default function Filters({handleSelect,limpiar}){
    const[renCat, setRenCat] =useState([])
    useEffect(()=>{
        async function resAxios(){
            const resApi = await axios('http://localhost:3001/products')
            if(resApi.data){
                const categorias = []
                resApi.data.productos.map((ele)=>{
                    categorias.push(ele.categoria)
                })
                setRenCat([... new Set(categorias)])
            }
        }
        resAxios()
    },[])
    return(
        <div>
            <button onClick={limpiar}>ver paginado</button>
            <select onChange={handleSelect}>
                {renCat?.map((ele)=>{
                    return(
                        <option key={ele} name={ele}>{ele}</option>
                    )
                })}
            </select>
        </div>
    )
}