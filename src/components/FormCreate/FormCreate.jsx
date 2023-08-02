import style from './FormCreate.module.css'
import { useCallback, useState } from 'react'
import axios from 'axios'
import {useDropzone} from 'react-dropzone'

export default function FormCreate() {
  const [errorImagen, setErrorImagen] = useState('')
  const [ crearProd, setCrearProd ] = useState({
    nombreproducto:'',//
    descproducto:'',//
    precioproducto:0,//
    disponibproducto:0,//
    categoria:''
  })
  const [fotoprinc,setFotoprinc] = useState('')
  
  const name_cloudinary = 'dpssouwww'
  async function submit(event){
    event.preventDefault()
    try {
      const api = await axios.post('http://localhost:3001/products',{
        nombreproducto:crearProd.nombreproducto,
        descproducto:crearProd.descproducto,
        colorproducto:crearProd.colorproducto,
        fotoprinc:fotoprinc,
        precioproducto:crearProd.precioproducto,
        disponibproducto:crearProd.disponibproducto,
        categoria:crearProd.categoria
      })
      alert(`Producto ${crearProd.nombreproducto} creado exitosamente`)
      return api.data
    } catch (error) {
      console.log(error.message);
    }
    
  }
  const HandleInputs = (event)=>{
    const newProd = {...crearProd}
    newProd[event.target.id] = event.target.value
    setCrearProd(newProd)
  }
  const onDrop = useCallback(async(acceptedFiles,rejectFiles)=>{
    try {
      if(acceptedFiles){
      const file = acceptedFiles[0]
      const formData = new FormData();
      formData.append("file",file)
      formData.append("upload_preset","imagenes")
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${name_cloudinary}/image/upload`,formData)
      if(res.data){
        setFotoprinc(res.data.secure_url)
      }
      }else{
      console.log(rejectFiles);
      }
    } catch (error) {
      console.log(error.message);
    }
    
  },[])
  const{ getRootProps, getInputProps,isDragActive} = useDropzone({onDrop})
  const revertir = ()=>{
    setFotoprinc('')
  }
  

  
    return(
        <div className={style.container}>
            <form action="" onSubmit={(event)=>submit(event)}>
                {!fotoprinc?<div  className={style.drop} {...getRootProps()}>
                  <input id='fotoprinc' {...getInputProps()}/>
                  {isDragActive?'Agregar imagen':'Esperando imagen'}
                </div>:null}
                <br />
                {fotoprinc?<span className={style.butonInterno} onClick={revertir}>Cambiar foto</span>:null}
                <br />
                {fotoprinc?'Imagen agregada con exito':errorImagen}
                <div>
                  <span>Nombre del producto</span>
                  <input onChange={HandleInputs} 
                  type="text" 
                  id = 'nombreproducto' 
                  value={crearProd.nombreproducto}
                  />
                </div>
                <div>
                  <span>Descripción</span>
                  <input 
                  onChange={HandleInputs} 
                  id='descproducto' 
                  value={crearProd.descproducto} 
                  type="text" /> 
                </div>
                <div>
                  <span>Precio</span>
                  <input 
                  onChange={HandleInputs}
                  id='precioproducto' 
                  value={crearProd.precioproducto} 
                  type="number" />
                </div>
                <div>
                  <span>Productos disponibles</span>
                  <input 
                  onChange={HandleInputs}
                  id='disponibproducto' 
                  value={crearProd.disponibproducto} 
                  type="number" />
                </div>
                <div>
                  <span>Categoria</span>
                  <input 
                  onChange={(event)=>{HandleInputs(event);}}
                  id='categoria' 
                  value={crearProd.categoria} 
                  type="text" />
                </div>
                
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}