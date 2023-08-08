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

    const indexLastProducts = currentPage * productsPerPage;
    const indexFirstProducts = indexLastProducts - productsPerPage;
    const currentProducts = allProducts?.slice(indexFirstProducts, indexLastProducts)

    const pagination = pagesNumber => {
        setCurrentPage(pagesNumber)
    }

    const[ ver ,setVer ] = useState([])
    const[ error, setError ] = useState('')

    
    
    useEffect(() => {
        dispatch(getProductos())
    }, [dispatch])

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
    const handleSelect = async(event)=>{
        try {
            const resApi = await axios(`http://localhost:3001/buscarProductos?cate=${event.target.value}`)
            if(resApi.data){
                setError('')
                return setVer(resApi.data.productos);
            }
        } catch (error) {
            const resError = error.request.response.split('"mensaje":')[1].split('}')[0].split('"')[1]
            setError(resError)
            return setVer([])
        }
    }
    const limpiar = ()=>{
        setError('')
        setVer([])
    }
    return(
        <div class='w-full h-screen flex flex-col'>
            <div class='w-full basis-1' >
               <SearchBar onSearch={onSearch}/> 
            </div>
            <div class='flex flex-row'>

                <div class='basis-1/4'>
                    <Filters limpiar={limpiar} handleSelect={handleSelect}/>
                </div>
                <div class='basis-1/2 flex flex-col'>

                    {!ver.length&&!error&&<div class='items-center justify-center'>
                        <Pagination 
                            productsPerPage={productsPerPage}
                            allProducts={allProducts.length}
                            pagination={pagination}
                        />
                    </div>}
                    <div class='flex-wrap mt-15'>
                        <div>
                            {error?<ErrorSearch error={error}/>:null}
                        </div>
                        <div>
                            {ver?<Results ver={ver}/>:null
                            }
                        </div>
                        {!ver.length&&!error&&<div class='flex flex-row w-full mt-10'>
                        { currentProducts?.map((e, k) => {
                                    if(e.nombreproducto){
                                        return(
                                            <div key={k}  >
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
                    
                </div>
                <div class='basis-1/4'></div>
            </div>
            
            
        </div>
    )
}