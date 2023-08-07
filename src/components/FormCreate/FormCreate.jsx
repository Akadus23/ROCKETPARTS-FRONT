import style from './FormCreate.module.css'
import { useCallback, useState } from 'react'
import axios from 'axios'
import {useDropzone} from 'react-dropzone'
import {
  validate_Nombre,
  validate_Desc,
  validtade_Precio,
  validtade_Cantidad,
  validtade_Categoria,
  validtade_Marca
} from './Validation'

export default function FormCreate() {
  const [errorImagen, setErrorImagen] = useState('')
  const [ crearProd, setCrearProd ] = useState({
    nombreproducto:'',
    descproducto:'',
    precioproducto:'',
    disponibproducto:'',
    categoria:'',
    marca:'',
  })
  const [fotoprinc,setFotoprinc] = useState('')
  const name_cloudinary = 'dpssouwww'
  async function submit(event){
    event.preventDefault()
    if(crearProd.nombreproducto && crearProd.descproducto && fotoprinc && crearProd.precioproducto && crearProd.categoria && crearProd.marca && crearProd.disponibproducto){
      if(crearProd.nombreproducto.length > 20 || crearProd.nombreproducto.length < 3) return alert(`Error en el Nombre`)
      if(crearProd.precioproducto > 2000 || Number(crearProd.precioproducto) === 0)return alert(`Error en el precio`)
      if(!Number(crearProd.disponibproducto) || !Number.isInteger(Number(crearProd.disponibproducto))) return alert('Error en Productos disponibles')
      if(crearProd.categoria.length > 15 || crearProd.categoria.length < 3) return alert('Error en Categoria')
      if(crearProd.marca.length > 20 || crearProd.marca.length < 3) return alert('Error en Marca')
      if(crearProd.descproducto.length > 130 || crearProd.descproducto.length < 20)return alert('Error en Descripción')
      try {
      const api = await axios.post('http://localhost:3001/products',{
        nombreproducto:crearProd.nombreproducto,
        descproducto:crearProd.descproducto,
        fotoprinc:fotoprinc,
        precioproducto:crearProd.precioproducto,
        disponibproducto:crearProd.disponibproducto,
        categoria:crearProd.categoria,
        marca:crearProd.marca,
        dispoboleano:crearProd.disponibproducto?true:false
      })
      alert(`Producto ${crearProd.nombreproducto} creado exitosamente`)
      return api.data
    } catch (error) {
      setErrorImagen('')
    }
  }else{
    return alert('Recuerda llenar todos los campos que tengan un *')
  }    
}
  const HandleInputs = (event)=>{
    if(event.target.value < 0)return
    const newProd = {...crearProd}
    newProd[event.target.id] = event.target.value
    setCrearProd(newProd)
    validate_Nombre(newProd.nombreproducto,setErrorNombre)
    validate_Desc(newProd.descproducto,setErrorDesc)
    validtade_Precio(newProd.precioproducto,setErrorPrecio)
    validtade_Cantidad(newProd.disponibproducto,setErrorCant)
    validtade_Categoria(newProd.categoria,setErrorCategoria)
    validtade_Marca(newProd.marca,setErrorMarca)
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
      console.log(error.request.responseText.split(':')[2].split('}')[0]);
    }
    
  },[])
  const{ getRootProps, getInputProps,isDragActive} = useDropzone({onDrop})
  const revertir = ()=>{
    setFotoprinc('')
  }

  const [errorNombre,setErrorNombre] = useState('Ingresa un Nombre')
  const [errorDesc,setErrorDesc] = useState('Ingresa una Descripción')
  const [errorPrecio,setErrorPrecio] = useState('Ingresa un precio Estandar')
  const [errorCant, setErrorCant] = useState('Ingrese la cantidad de productos a la venta')
  const [errorCategoria,setErrorCategoria] = useState('A que tipo de mercado pertenece tu producto')
  const [errorMarca,setErrorMarca] = useState('A que marca pertenece tu producto?')
    return(
        <div className={style.container}>
            <form action="" onSubmit={(event)=>submit(event)}>
                <div>
                  <span>Nombre del producto</span>
                  <br />
                  <input onChange={HandleInputs} 
                  type="text" 
                  id = 'nombreproducto'
                  placeholder=''
                  value={crearProd.nombreproducto}
                  />*
                  <br />
                  <span>{errorNombre || '✔'}</span>
                </div>
                <div>
                  <span>Precio</span>
                  <br />
                  <input 
                  onChange={HandleInputs}
                  id='precioproducto' 
                  value={crearProd.precioproducto} 
                  type="number" />*
                  <br />
                  <span>{errorPrecio || '✔'}</span>
                </div>
                <div>
                  <span>Productos disponibles</span>
                  <br />
                  <input 
                  onChange={HandleInputs}
                  id='disponibproducto' 
                  value={crearProd.disponibproducto} 
                  type="number" />*
                  <br />
                  <span>{errorCant || '✔'}</span>
                </div>
                <div>
                  <span>Categoria</span>
                  <br />
                  <input 
                  onChange={(event)=>{HandleInputs(event);}}
                  id='categoria' 
                  value={crearProd.categoria} 
                  type="text" />*
                  <br />
                  <span>{errorCategoria || '✔'}</span>
                </div>
                <div>
                  <span>Marca</span>
                  <br />
                  <input 
                  onChange={(event)=>{HandleInputs(event);}}
                  id='marca' 
                  value={crearProd.marca} 
                  type="text" />*
                  <br />
                  <span>{errorMarca || '✔'}</span>
                </div>
                <div>
                  <span>Descripción</span>
                  <br />
                  <textarea 
                  onChange={HandleInputs} 
                  id='descproducto' 
                  value={crearProd.descproducto} 
                  type="Text" />*
                  <br />
                  <span>{errorDesc || '✔'}</span>
                </div>
                <br />
                {!fotoprinc?<div  className={style.drop} {...getRootProps()}>
                  <input id='fotoprinc' {...getInputProps()}/>
                  {isDragActive?'Agregar imagen':'Esperando imagen'}
                </div>:null}
                <br />
                {fotoprinc?<span className={style.butonInterno} onClick={revertir}>Cambiar foto</span>:null}
                <br />
                {fotoprinc?'Imagen agregada con exito':errorImagen}
                <br />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}