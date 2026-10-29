import { useState, useEffect, use } from "react";
import catlargeitem1 from "../../assets/images/catlargeitem1.jpg";
import { HiOutlineHeart } from "react-icons/hi2";
import { toast } from "sonner";

const ProductDetails = ({ singleproducts }) => {

  const [MainImage, SetMainImage] = useState("");
  const variant = singleproducts?.productvariant?.[0];
  const [SelectedSize,setSelectedSize]=useState('');
  const [SelectedColor,SetSelectedColor]=useState('');
  const [Quantity,Setquantity]=useState(1);
  const [isButtonDisabled,SetisButtonDisabled]=useState(false)


  const handleQuantity=(action)=>{
    if(action === 'plus') Setquantity((prev)=> prev+1);
    if(action ==='minus' && Quantity>1) Setquantity((prev)=> prev-1);
  }

  const handleaddtocart=()=>{
    if(!SelectedColor || !SelectedSize){
        toast.error('Please select a size and color before adding to cart.',{
            duration:1000,
        });
        return;
    }


    SetisButtonDisabled(true);

    setTimeout(() => {
        toast.success('Product added to cart!',{
            duration:1000,
        });
        SetisButtonDisabled(false)
    },500);

  }


  console.log("Product:", singleproducts);
  console.log("Images:", singleproducts?.productimage);

  useEffect(() => {
    if (singleproducts?.productimage?.length > 0) {
      SetMainImage(singleproducts.productimage?.[0]?.image);
    }
    
    // if(variant?.size){
    //     setSelectedSize(variant?.size);
    // }
  }, [singleproducts]);

  return (
    <>
      <div className="p-7">
        <div className="container mx-auto bg-white ">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left side */}
            <div className="hidden md:flex flex-col gap-3  ">
              {/* <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" />
                            <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" />
                            <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" /> */}

              <div className="flex flex-col gap-3">
                {singleproducts?.productimage?.map((item, index) => (
                  <img
                    key={item.id ?? index}
                    src={item.image}
                    alt={item.alt_text || singleproducts.name}
                    className={`w-20 h-24 object-cover cursor-pointer border ${
                      MainImage === item.image
                        ? "border-black"
                        : "border-gray-400"
                    }`}
                    onClick={() => SetMainImage(item.image)}
                  />
                ))}
              </div>
            </div>

            {/* center content */}
            <div className=" md:w-1/2 ">
              <div className="mb-2">
                <img src={MainImage} alt="Product Image" />
              </div>
            </div>

            {/* Mobile size */}

            <div className="md:hidden flex overscroll-x-scroll gap-3">
              {/* <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" />
                            <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" />
                            <img className=" w-40 h-50 object-cover cursor-pointer " src={catlargeitem1} alt="" /> */}

              {singleproducts?.productimage?.map((item, index) => (
                <img
                  key={item.id ?? index}
                  src={item.image}
                  alt={item.alt_text}
                  className={`w-20 h-24 object-cover cursor-pointer border ${
                    MainImage === item.image ? "border-black" : "border-gray-400"
                  } `}
                  onClick={() => SetMainImage(item.image)}
                />
              ))}
            </div>

            {/* Right section */}
            <div className="mt-2 md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl ">{singleproducts?.name}</h1>

              <div className="relative">
                <p className="text-3xl text-gray-400">
                  {" "}
                  ₹{variant?.price ?? "N/A"}
                </p>
                <p className="absolute top-3 left-17 text-lg text-gray-400">
                  $499
                </p>
              </div>

              <p className="text-md text-gray-500 w-[85%] ">
                {singleproducts?.description}
              </p>

              {/* color section */}
              <div className="mb-3">
                <p className="text-gray-400 text-2xl">Color:</p>

                <div className="flex gap-3 mt-2">
                    {
                        singleproducts?.productvariant?.map((color)=>(
                            <button 
                            key={color.id}
                            onClick={()=> SetSelectedColor(color.color)}
                            style={{backgroundColor: color.color.toLowerCase()}}
                            title={color.color}
                            className={`w-8 h-8 rounded-full border ${SelectedColor === color.color ? 'border-3 border-black':'border-gray-300' }`}
                            
                            >
                                
                            </button>
                        ))
                    }
                    
                    {/* {SelectedColor?? color.color ?? "N/A"} */}
                  
                </div>
              </div>

              {/* size section */}
             <div className="mb-3">
                <p className="text-2xl text-gray-400">Size:</p>

                <div className="flex gap-2 mt-2">
                    {singleproducts?.productvariant?.map((size) => (
                    <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-4 border-2 ${
                        SelectedSize?.id === size.id
                            ? "bg-black text-white" 
                            : "bg-white text-black"
                        }`}
                    >
                        {size.size ?? "N/A"}
                    </button>
                    ))}
                </div>
            </div>


              <div className="flex flex-row gap-1">
                <p className="text-md text-gray-500"> {variant?.stock ?? 0} </p>{" "}
                <span className="text-sm text-gray-400">in Stock</span>
              </div>

              {/* quedity */}
              <div className="mt-3 ">
                <p>Quantity:</p>
                <div className="flex items-center gap-2">
                  <button 
                  className="px-3 py-2 bg-gray-200 text-lg"
                  onClick={()=> handleQuantity('minus')}
                  >-</button>
                  <span className="text-lg">{Quantity}</span>
                  <button 
                  className="px-3 py-2 bg-gray-200 text-lg"
                  onClick={()=> handleQuantity('plus')}
                  >+</button>

                  <div className="bg-black">
                    <button 
                    onClick={handleaddtocart}
                    disabled={isButtonDisabled} 
                    className={`px-9 py-2 w-[13rem] text-white ${isButtonDisabled ? "cursor-not-allowed opacity-50": 'hover:bg-gray-900' }`}>
                     
                      {isButtonDisabled ? "Adding...": " ADD TO CART"}
                    </button>
                  </div>

                  <div>
                    <button className="text-center font-medium flex justify-center items-center bg-black py-2 w-[3rem] ">
                      <HiOutlineHeart className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* category: */}
              <div className=" pt-4 flex items-center gap-1">
                <p className="text-[1rem] text-black ">Category:</p>
                <p className="text-gray-500">Man,Dresses,black</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
