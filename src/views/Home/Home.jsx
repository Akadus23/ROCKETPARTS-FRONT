import { useState} from 'react'
import SearchBar from "../../components/SearchBar/SearchBar";
import Results  from '../../components/Results/Results';
import ErrorSearch from '../../components/ErrorSearch/ErrorSearch';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar';
export default function Home (){
    const[ ver ,setVer ] = useState([])
    const[ error, setError ] = useState('')
    

    const onSearch = async(bar,setNoVer)=>{
        try {
            const respApi = await axios(`http://localhost:3001/products/${Number(bar)}`)
            setNoVer(true)
            setError('')
            return setVer([...ver,respApi.data])  
        } catch (error) {
            setNoVer(false)
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
                {ver?<Results ver={ver}/>:null}
            </div>
            <div>
                {error?<ErrorSearch error={error}/>:null}
            </div>
        </div>
    )
}