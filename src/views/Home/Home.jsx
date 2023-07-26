import { useState} from 'react'
import SearchBar from "../../components/SearchBar/SearchBar";
import Results  from '../../components/Results/Results';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar';
export default function Home (){
    const[ ver ,letVer ] = useState([])
    

    const onSearch = async(bar)=>{
        const respApi = await axios(`http://localhost:3001/products/${Number(bar)}`)
        console.log(respApi.data);
        return letVer([...ver,respApi.data])
    }
    return(
        <div>
            <div>
               <SearchBar onSearch={onSearch}/> 
            </div>
            <div>
                <Results ver={ver}/>
            </div>
        </div>
    )
}