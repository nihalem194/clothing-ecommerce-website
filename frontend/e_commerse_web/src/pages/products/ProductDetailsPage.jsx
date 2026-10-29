import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getProductsSlug } from '../../services/ProductService'
import ProductDetails from './ProductDetails'

const ProductDetailsPage = () => {

    const {slug}=useParams()
    const [products,setproducts]=useState(null)
    const [loading,setloading]=useState(true)
    const [error,seterror]=useState(false)



    useEffect(()=>{
        const fetchProducts= async ()=>{
            setloading(true)
            seterror(false)
            setproducts(null)

            try{
                const response= await getProductsSlug(slug);
                setproducts(response.data)
                console.log('productDetails:',response.data)
                
            }catch(error){
                console.log('No Product details',error)
                seterror(true)
            }
            finally{
                setloading(false)
            }
        }
        if(slug){
            fetchProducts()
        }
        
    },[slug])
    

    if(loading){
        return(
            <div>
                <h1 className='text-center mt-14'>Loading Product.....</h1>
            </div>
        )
    }

    if(error || !products){
        return(
             <h1 classname="text-center mt-10"> Product Not Found</h1>
        )
    }


    



  return (
    <>
        <section classname='container mx-auto'>

          <ProductDetails singleproducts={products} />

           



        </section>
    </>
  )
}

export default ProductDetailsPage
