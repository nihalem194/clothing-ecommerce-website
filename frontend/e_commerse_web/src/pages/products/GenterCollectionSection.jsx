import catlargeitem1 from "../../assets/images/catlargeitem1.jpg";
import catlargeitem2 from "../../assets/images/catlargeitem2.jpg";
import { Link } from "react-router-dom";

const GenterCollectionSection=()=>{
    return(
        <>
        <section className="py-5 ">
            <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-center ">
                {/* Man collection*/}
                <div className="relative">
                    <img src={catlargeitem1} alt="Man's Collection"
                        className="w-full h-[700px] object-cover"                    
                    />
                    <div className="absolute  bottom-28 left-1/3">
                        <Link to={"*"} className="py-2 px-3 text-center  bg-white " >Shop For Man</Link>
                    </div>

                </div>

                {/* women collection */}
                <div className="relative">
                    <img src={catlargeitem2} alt="Women's Collection" 
                        className="w-full h-[700px] object-cover"
                    />

                    <div className="absolute bottom-28 left-1/3">
                    <Link to={'*'} className="py-2 px-3 bg-white text-center">Shop For Women</Link>

                    </div>

                </div>


            </div>

        </section>
        </>
    )
}

export default GenterCollectionSection