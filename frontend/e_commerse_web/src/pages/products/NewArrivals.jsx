import { getProducts } from "../../services/ProductService"
import {useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NewArrivalsCard from "./NewArrivalsCard"

const NewArrivals=()=>{

    const [products,setproducts]=useState([])
    // const [isDragging,setIsDragging]=useState(false)

    useEffect(()=>{

        const fetchProducts= async ()=>{

            try{

                const response=await getProducts();
                setproducts(response.data.results ?? response.data)
                console.log(response.data.results)
            }catch(error){
                console.log('failed to fetch products:',error)
            }

        }
        fetchProducts();

    },[])

    // const hadleMouseDown=(e)=>{
    //     setIsDragging(true)
    // }


    return(
        <>
        {/* onmousedown={hadleMouseDown} */}
         
            <section className="py-5">
                <div className="container mx-auto  ">
                    <div className="flex justify-between ">
                        <h3>OUR NEW ARRIVALS</h3>
                        <Link to={'*'} className="text-black hover:text-gray-400" ><p className="text-sm">VIEW ALL PRODUCTS</p></Link>
                    </div>
                    <div className={`flex gap-6 scrollbar-none overflow-x-scroll mt-4 `}>
                        {
                            products.slice(0, 6).map((product,index)=>(
                                // <NewArrivalsCard key={product.id} productimages={product.productimage?.[0]?.image} productname={product.name} productprice={product.productvariant?.[0]?.price} />
                                <NewArrivalsCard 
                                key={index}
                                product={product}
                                />
                            ))
                        }

                    </div>

                </div>

            </section>
        </>
    )
}

export default NewArrivals