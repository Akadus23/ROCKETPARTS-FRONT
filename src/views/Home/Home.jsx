import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../../components/SearchBar/SearchBar";
import Results  from '../../components/Results/Results';
import ErrorSearch from '../../components/ErrorSearch/ErrorSearch';
import axios from 'axios'
import Filters from '../../components/Filters/Filters';
import { Link } from 'react-router-dom';
import { getProductos } from '../../redux/actions';
import Pagination from '../../components/Pagination/Pagination';
import Card from '../../components/Card/Card';


export default function Home (){

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.Productos)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const[ ver ,setVer ] = useState([])
    const[ error, setError ] = useState('')

    const indexLastProducts = currentPage * productsPerPage;
    const indexFirstProducts = indexLastProducts - productsPerPage;
    const currentProducts = allProducts?.slice(indexFirstProducts, indexLastProducts)

    const pagination = pagesNumber => {
        setCurrentPage(pagesNumber)
    }
    useEffect(() => {
        dispatch(getProductos())
    }, [dispatch])
    const disponibles = async() =>{
        if(ver.length){
            if(ver.filter(ele=>ele.disponibproducto>=1).length){
              setVer(ver.filter(ele=>ele.disponibproducto>=1))
              setError('')  
            }else{
                setVer([])
              setError('No se encontraron productos disponibles en tu busqueda')  
            }
        }else{
            try {
               const resApi = await axios('http://localhost:3001/disponible')
               setError('')
               return setVer(resApi.data)
            } catch (error) {
                setError(error.message)
            }
            
        }
    }
    const noDisponibles = async()=>{
        try {
            const resApi = await axios('http://localhost:3001/nodisponible')
            return setVer(resApi.data)
         } catch (error) {
             setError(error.message)
         }
    }
    const onSearch = async(bar)=>{
        try {
            const respApi = await axios(`http://localhost:3001/buscarProductos?prod=${bar}`)
            setError('')
            if(respApi.data.productos){
                return setVer(respApi.data.productos)
            }
            else{
                setError(`${respApi.data.message.slice(0,-1)} con la busqueda de ${bar}.`)
                return setVer([])
            }
        } catch (error) {
            setVer([])
            const resError = error.request.response.split('"mensaje":')[1].split('}')[0].split('"')[1]
            return setError(resError)
        }
        
    }
    const handleSelect = async(event,setManejoFilt)=>{
        setManejoFilt(false)
            try {
                const resApi = await axios(`http://localhost:3001/buscarProductos?cate=${event.target.value}`)
                if(resApi.data){
                    setError('')
                    event.target.value = event.target[0].value
                    return setVer(resApi.data.productos);
                }
            } catch (error) {
                const resError = error.request.response.split('"mensaje":')[1].split('}')[0].split('"')[1]
                setError(resError)
                return setVer([])
            }
    }
    const handleSelectMarcas = async(event,manejoFilt,setManejoFilt)=>{
        if(manejoFilt){
            try {
                const resApi = await axios(`http://localhost:3001/buscarProductos?marca=${event.target.value}`)
                if(resApi.data){
                    setError('')
                    event.target.value = event.target[0].value
                    return setVer(resApi.data.productos);
                }
            } catch (error) {
                const resError = error.request.response.split('"mensaje":')[1].split('}')[0].split('"')[1]
                event.target.value = event.target[0].value
                setError(resError)
                return setVer([])
            }  
        }else{
            if(ver.filter(ele=>ele.marca.toLowerCase() === event.target.value.toLowerCase()).length){
                setVer(ver.filter(ele=>ele.marca.toLowerCase() === event.target.value.toLowerCase()))
                event.target.value = event.target[0].value
                setManejoFilt(true)
            }else{
                setVer([])
                event.target.value = event.target[0].value
                setError('No se encontraron productos con estas especificaciones')
            }
        }   
    }
    const limpiar = ()=>{
        setError('')
        setVer([])
    }
    const ordenarAlf = (items,getter,orden)=>{
        if(ver.length){
            setVer([])
            items.sort((a, b)=>{
                const first = getter(a);
                const second = getter(b);
                const compare = first.localeCompare(second)
                return orden? compare: -compare
            })
            setError('')
            setVer(items)
            return aplicar()
        }else{

        }
    }
    const ordenarNum = (items,getter,orden)=>{
        if(ver.length){
            setVer([])
            items.sort((a, b)=>{
                const first = Number(getter(a))
                const second = Number(getter(b))
                const compare = first-second
                return orden?compare:-compare
            })
            setError('')
            setVer(items)
            return aplicar()
        }else{
            
        }
    }
    const aplicar = ()=>{
        if(ver.length){
            if(ver.filter(ele=>ele).length){
              setVer(ver.filter(ele=>ele))
              setError('')
            }else{
                setVer([])
              setError('No se encontraron productos disponibles en tu busqueda')  
            }
        }
    }
    return(
        <div>
            <Link to='/Carrito'><button>ver carrito</button></Link>
            <div>
               <SearchBar onSearch={onSearch}/> 
            </div>
            <div>
                <Filters ordenarNum={ordenarNum} ordenarAlf={ordenarAlf} noDisponibles={noDisponibles} handleSelectMarcas={handleSelectMarcas} disponibles={disponibles} ver={ver} limpiar={limpiar} handleSelect={handleSelect}/>
            </div>
            {!ver.length&&!error&&<div>
                <Pagination 
                    productsPerPage={productsPerPage}
                    allProducts={allProducts.length}
                    pagination={pagination}
                />
            </div>}
            <div>
                {error?<ErrorSearch error={error}/>:null}
            </div>
            <div>
                {ver?<Results ver={ver}/>:null
                }
            </div>
            {!ver.length&&!error&&<div>
            { currentProducts?.map((e, k) => {
                        if(e.nombreproducto){
                            return(
                                <div key={k} >
                                    <Card
                                    all={e}
                                    dispo={e.disponibproducto}
                                    key={e.id}
                                    id={e.id}
                                    nombre={e.nombreproducto}
                                    descuento={e.descproducto}
                                    img={e.fotoprinc}
                                    precio={e.precioproducto}
                                    calificacion={e.calificacionproducto}
                                    />
                                </div>
                            )
                        }
                    }) }
            </div>}
        </div>
    )
}