import { useState } from "react"


const CartDrawer=()=>{
    const [drawerOpen,setdrawerOpen]=useState(false)

    const toggleCartDrawer=()=>{
        setdrawerOpen(!drawerOpen)
    }


    return(
        <>
            <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg
                 transform transition-transform duration-300 flex flex-col ${drawerOpen ? 'translate-x-0': 'translate-x-full'}`}>

                {/* close buttun */}
                <div className="flex justify-end p-4">
                    <IoMdClose className='h-6 w-6 bg-gray-50 ' />
                </div>
            </div>
        </>
    )
}

export default CartDrawer