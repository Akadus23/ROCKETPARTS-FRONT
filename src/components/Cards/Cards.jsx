import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getAllProducts } from "../../redux/actions";
import Card from "../Card/Card"
import "./Cards.css"
import Pagination from "../Pagination/Pagination";


export default function Cards(){
    const allProducts = useSelector(state=>state.allProducts)
    console.log("Todos:", allProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);
    

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage =3;

    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = allProducts.slice(firstProductIndex, lastProductIndex);
    
    return(
        <div className="container-cards">
            {currentProducts.map(product=>(
                <Card key={product.id}
                      id={product.id}
                      producto={product.nombreproducto}
                      descripcion={product.descproducto}
                      color={product.colorproducto}
                      mainPhoto={product.fotoprinc}
                />
            ))}
            
            <Pagination
                totalProducts={allProducts.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
                     
            
        </div>
    )
}