import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io"

const CartDrawer=({drawerOpen,toggleCartDrawer})=>{


    return(
        <>
            <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg
                 transform transition-transform duration-300 flex flex-col ${drawerOpen ? 'translate-x-0': 'translate-x-full'}`}>

                {/* close buttun */}
                <div className="flex justify-end p-4">
                    <button onClick={toggleCartDrawer}>
                        {/* close icon */}  
                        <IoMdClose className='h-6 w-6 text-grey-500'/>
                    </button>
                   
                </div>
                
                {/* cart scrollable area */}
                <div className="flex-grow px-4 overflow-y-auto ">
                    <h2 className="text-xl  font-semibold mb-4">Your Cart</h2>

                </div>

                {/* checkout button */}

                <div className="px-4 sticky bg-white bottom-0">
                    <Link>
                        <button className="w-full text-white bg-black hover:bg-gray-500 py-3">Checkout</button>
                    </Link>
                    <p className="text-sm text-gray-500 mt-2 text-center ">Shipping, Taxes, and discount calculated at checkout</p>
                </div>

                

            </div>
                
            
        </>
    )
}

export default CartDrawer