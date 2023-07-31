import style from './FormCreate.module.css'
import { useCallback, useState } from 'react'
import axios from 'axios'
import {useDropzone} from 'react-dropzone'

export default function FormCreate() {
  const [errorImagen, setErrorImagen] = useState('')
  const onDrop = useCallback((acceptedFiles,rejectFiles)=>{
    if(acceptedFiles){
      const file = acceptedFiles[0]
      const formData = new FormData();
      formData.append("file",file)
      formData.append("upload_preset","imagenes")
      axios.post(`https://api.cloudinary.com/v1_1/${name_cloudinary}/image/upload`,formData)
      .then(res=>setCrearProd({... crearProd,fotoprinc:res.data.secure_url}))
      .catch(error=>setErrorImagen('Error al leer la imagen'))
    }else{
      console.log(rejectFiles);
    }
  },[])
  const{ getRootProps, getInputProps,isDragActive} = useDropzone({
    onDrop,
    accept: 'image/png'
  })
  const revertir = ()=>{
    setCrearProd({...crearProd,fotoprinc:''})
  }
  const [ crearProd, setCrearProd ] = useState({
    nombreproducto:'',//
    descproducto:'',//
    fotoprinc:'',//
    precioproducto:0,//
    disponibproducto:0,//
    categoria:''
  })
  const HandleInputs = (event)=>{
    const newProd = {...crearProd}
    newProd[event.target.id] = event.target.value
    setCrearProd(newProd)
  }
  const name_cloudinary = 'dpssouwww'
  async function submit(event){
    event.preventDefault()
    try {
      const api = await axios.post('http://localhost:3001/products',{
        nombreproducto:crearProd.nombreproducto,
        descproducto:crearProd.descproducto,
        colorproducto:crearProd.colorproducto,
        fotoprinc:crearProd.fotoprinc,
        precioproducto:crearProd.precioproducto,
        disponibproducto:crearProd.disponibproducto,
        fotosecund:crearProd.fotosecund,
        categoria:crearProd.categoria
      })
      alert(`Producto ${crearProd.nombreproducto} creado exitosamente`)
      return api.data
    } catch (error) {
      console.log(error.message);
    }
    
  }
  
    return(
        <div className={style.container}>
            <form action="" onSubmit={(event)=>submit(event)}>
                <div>
                  <span>Nombre del producto</span>
                  <input onChange={HandleInputs} 
                  type="text" 
                  id = 'nombreproducto' 
                  value={crearProd.nombreproducto} />
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
                  onChange={HandleInputs}
                  id='categoria' 
                  value={crearProd.categoria} 
                  type="text" />
                </div>
                {!crearProd.fotoprinc?<div className={style.drop} {...getRootProps()}>
                  <input {...getInputProps()}/>
                  {isDragActive?'Agregar imagen':'Esperando imagen'}
                </div>:null}
                <br />
                {crearProd.fotoprinc?<span className={style.butonInterno} onClick={revertir}>Cambiar foto</span>:null}
                <br />
                <br />
                {crearProd.fotoprinc?'Imagen agregada con exito':errorImagen}
                <br />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}