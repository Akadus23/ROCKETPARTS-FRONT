import { useState} from 'react'
import SearchBar from "../../components/SearchBar/SearchBar";
import Results  from '../../components/Results/Results';
import ErrorSearch from '../../components/ErrorSearch/ErrorSearch';
import axios from 'axios'
import Filters from '../../components/Filters/Filters';
export default function Home (){
    const[ ver ,setVer ] = useState([])
    const[ error, setError ] = useState('')
    

    const onSearch = async(bar)=>{
        try {
            const respApi = await axios(`http://localhost:3001/buscarProductos?prod=${bar}`)
            setError('')
            return respApi.data.productos?setVer(respApi.data.productos):setError(respApi.data.message) 
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
                setVer(resApi.data.productos);
            }
        } catch (error) {
            setVer([])
            const resError = error.request.response.split('"mensaje":')[1].split('}')[0].split('"')[1]
            return setError(resError)
        }
    }
    return(
        <div>
            <div>
               <SearchBar onSearch={onSearch}/> 
            </div>
            <div>
                <Filters handleSelect={handleSelect}/>
            </div>
            <div>
                {ver?<Results ver={ver}/>:null}
            </div>
            <div>
                {error?<ErrorSearch error={error}/>:null}
            </div>
        </div>
    )
}