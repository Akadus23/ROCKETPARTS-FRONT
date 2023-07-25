import { useState} from 'react'
import SearchBar from "../SearchBar/SearchBar";
import Results  from '../Results/Results';
import axios from 'axios'
import ErrorSearch from '../ErrorSearch/ErrorSearch';



export default function Home (){
    const[ ver ,letVer ] = useState([])
    const [ error, setError ] = useState("")
    

    const onSearch = async(bar,setNoVer)=>{
        try {
          // const respApi = await axios(`http://localhost:3001/products?prod=${bar}`)
            const respApi = await axios(`http://localhost:3001/products/${Number(bar)}`);
            setNoVer(false);
            setError("");
            return letVer([...ver,respApi.data]);
        } catch (error) {
            setNoVer(false);
            setError(error.message);
            return letVer([])
        }
        
    }
    return(
        <div>
            <div>
               <SearchBar onSearch={onSearch}/> 
            </div>
            <div>
                {ver?<Results ver={ver}/>:null}
                {error?<ErrorSearch error={error}/>:null}
            </div>
        </div>
    )
}