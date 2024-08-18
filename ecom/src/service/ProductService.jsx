import axios from "axios";

const productURl= "http://localhost:8080/home";

export const getAllProduct = ()=>{
            return axios.get(productURl +"/view-all-products");   
}

export const getProductByID=(id)=>{
return axios.get(productURl+"/product/"+id);
}