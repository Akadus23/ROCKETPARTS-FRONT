import { useState} from 'react'
import SearchBar from "../SearchBar/SearchBar";
import Results  from '../Results/Results';
import axios from 'axios'
export default function Home (){
    const[ ver ,letVer ] = useState([])
    

    const onSearch = async(bar)=>{
        const respApi = await axios(`http://localhost:3001/products?prod=${bar}`)
        console.log(respApi.data);
        // return letVer(respApi.data)
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