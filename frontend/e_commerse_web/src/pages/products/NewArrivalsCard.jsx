// import catlargeitem1 from "../../assets/images/catlargeitem1.jpg";
import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";
const NewArrivalsCard = ({product}) => {         /* productimages,productname,productprice*/

    const imageUrl = product?.productimage?.[0]?.image;
    const variant=product.productvariant?.[0];
    

  return (
    <>
      <div className="flex flex-col">

        <Link to={`/products/${product.slug}`}>
        
        <div className="relative w-[270px] h-[350px] overflow-hidden group">
            {imageUrl ? (
                <img
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                src={imageUrl}
                alt="New Arrivals product"
                />
            ): 
                <div className="bg-gray-200 p-5">
                    Image Not Available
                </div>
            }
        
    
            
        

        {/* Hover Button */}
        <div className="absolute bottom-3 left-0 w-full px-5  group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <button className=" w-full bg-white text-black py-2 px-2 rounded-md hover:bg-black hover:text-white transition-colors">
            Add to Cart
            </button>
        </div>

        {/* wishlist */}
        <div className="absolute top-3 right-3 ">
            <button className="text-center font-medium flex justify-center items-center ">
                <HiOutlineHeart className="h-6 w-6 bg-white" />
            </button>
        </div>

    </div>
    </Link>
  
        
    <Link to={`/products/${product.slug}`}>

            <div className="mt-2">
                <p className="text-black">{product.name}</p>
        </div>

        <div className="price">
            <p className="text-sm text-gray-600">
                {
                    variant.price ? `₹${variant.price}`: "Price not available"
                }
            </p>
        </div>
     
    
    </Link>
    
    </div>
    </>
  );
};

export default NewArrivalsCard;
