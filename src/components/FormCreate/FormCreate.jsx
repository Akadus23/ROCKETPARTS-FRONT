import style from './FormCreate.module.css'
import { useState } from 'react'
export default function FormCreate(props) {
  const [ crearProd, setCrearProd ] = useState({
    nombreproducto:'',//
    descproducto:'',//
    fotoprinc:'',//
    precioproducto:0,//
    disponibproducto:false,//
    fotosecund:'',//
    calificacionproducto:'',//
    categoria:''
  })

  const HandleInputs = (event)=>{
    const newProd = {...crearProd}
    newProd[event.target.id] = event.target.value
    setCrearProd(newProd)
  }
  const disponible = ()=>{
    const dispo = !crearProd.disponibproducto
    setCrearProd({...crearProd,disponibproducto:dispo})
  }
    return(
        <div className={style.container}>
            <form action="">
                <div>
                  <input onChange={HandleInputs} type="text" id = 'nombreproducto' value={crearProd.nombreproducto} />
                  {crearProd.nombreproducto}
                </div>
                <div>
                  <input onChange={HandleInputs} id='descproducto' value={crearProd.descproducto} type="text" />  
                  {crearProd.descproducto}
                </div>
                <div>
                  <input 
                  onChange={HandleInputs}
                  id='fotoprinc' 
                  value={crearProd.fotoprinc} 
                  type="text" />
                  {crearProd.fotoprinc}
                </div>
                <div>
                  <input 
                  onChange={HandleInputs}
                  id='precioproducto' 
                  value={crearProd.precioproducto} 
                  type="number" />
                  {crearProd.precioproducto}
                </div>
                <div>
                  <span onClick={disponible}>Disponible</span>
                  {crearProd.disponibproducto?<span>disponible</span>:<span>no disponible</span>}
                </div>
                <div>
                  <input 
                  onChange={HandleInputs}
                  id='fotosecund' 
                  value={crearProd.fotosecund} 
                  type="text" />
                  {crearProd.fotosecund}
                </div>
                <div>
                  <input 
                  onChange={HandleInputs}
                  id='calificacionproducto' 
                  value={crearProd.calificacionproducto} 
                  type="number" />
                  {crearProd.calificacionproducto}
                </div>
                <div>
                  <input 
                  onChange={HandleInputs}
                  id='categoria' 
                  value={crearProd.categoria} 
                  type="text" />
                  {crearProd.categoria}
                </div>
                <button>submit</button>
            </form>
        </div>
    )
}