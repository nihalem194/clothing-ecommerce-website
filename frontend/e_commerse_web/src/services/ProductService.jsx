
import api from "./api"

export const getProducts=()=>{
    return api.get('/products/')

};

export const getProductsSlug=(slug)=>{
    return api.get(`/products/${slug}/`)
};