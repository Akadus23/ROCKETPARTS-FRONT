// actions.js
import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const allProducts = (await axios.get("http://localhost:3001/products")).data;
      console.log("action", allProducts);
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allProducts.productos, // Asegúrate de que aquí esté accediendo correctamente al array de productos
      });
    } catch (error) {
      console.log(error);
    }
  };
};
