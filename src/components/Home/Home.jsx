import { useState } from 'react'
import axios from 'axios'
import SearchBar from "../SearchBar/SearchBar";
import Results  from '../Results/Results';
import Cards from '../Cards/Cards';


export default function Home (){
    const[ ver ,letVer ] = useState([])
    
    const [showCards, setShowCards] = useState(true); // Nuevo estado para controlar la visibilidad de las cards

  const handleSearch = (bar) => {
    if (bar) {
      setShowCards(false); // Ocultar las cards cuando se realice una búsqueda
    } else {
      setShowCards(true); // Mostrar las cards cuando la barra de búsqueda esté vacía
    }
  }

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

            <div>
                <Cards/>
            </div>
        </div>
    )
}